// deno-lint-ignore-file no-explicit-any
import {
  EMPTY,
  Observable,
  delayWhen,
  expand,
  from,
  map,
  mergeAll,
  mergeMap,
  of,
  shareReplay,
  skip,
  takeWhile,
  tap,
  toArray,
} from "https://esm.sh/rxjs@7.8.1";

const user = 464460;

const url = new URL(
  `https://www.gcores.com/gapi/v1/users/${user}/recommend?talk-include=topic%2Cuser%2Chelpful%2Cpoll-options%2Crelated-content.radio%2Crelated-content.video%2Crelated-content.article%2Crelated-content.game%2Crelated-content.film%2Crelated-content.album%2Crelated-content.album-bundle%2Crelated-content.product%2Crelated-content.discussion&original-include=user%2Cdjs%2Ccategory&order-by=time&fields[articles]=title%2Cdesc%2Cexcerpt%2Cis-published%2Cthumb%2Capp-cover%2Ccover%2Ccomments-count%2Clikes-count%2Cbookmarks-count%2Cis-verified%2Cpublished-at%2Coption-is-official%2Coption-is-focus-showcase%2Cduration%2Cdraft%2Caudit-draft%2Cuser%2Ccomments%2Ccategory%2Ctags%2Centries%2Centities%2Csimilarities%2Clatest-collection%2Ccollections%2Coperational-events%2Cportfolios%2Ccatalog-tags&fields[videos]=title%2Cdesc%2Cexcerpt%2Cis-published%2Cthumb%2Capp-cover%2Ccover%2Ccomments-count%2Clikes-count%2Cbookmarks-count%2Cis-verified%2Cpublished-at%2Coption-is-official%2Coption-is-focus-showcase%2Cduration%2Cdraft%2Caudit-draft%2Cuser%2Ccomments%2Ccategory%2Ctags%2Centries%2Centities%2Csimilarities%2Clatest-collection%2Ccollections%2Coperational-events%2Cportfolios%2Ccatalog-tags%2Cmedia%2Cdjs%2Calbums%2Cpublished-albums&fields[radios]=title%2Cdesc%2Cexcerpt%2Cis-published%2Cthumb%2Capp-cover%2Ccover%2Ccomments-count%2Clikes-count%2Cbookmarks-count%2Cis-verified%2Cpublished-at%2Coption-is-official%2Coption-is-focus-showcase%2Cduration%2Cdraft%2Caudit-draft%2Cuser%2Ccomments%2Ccategory%2Ctags%2Centries%2Centities%2Csimilarities%2Clatest-collection%2Ccollections%2Coperational-events%2Cportfolios%2Ccatalog-tags%2Cmedia%2Cdjs%2Clatest-album%2Calbums%2Cis-free%2Cis-require-privilege`
);

const gcoresImageUrl = (image: string) =>
  `https://image.gcores.com/${image}?x-oss-process=image/quality,q_90/format,webp`;

const localImageUrl = (image: string) =>
  `https://0xc1.space/images/gcores/${image}`;

// pagination
url.searchParams.set("before", `${Date.now() / 1000}`);

interface IGcoresTalk {
  text: string;
  images: string[];
  published_at: number;
  tags: string[];
}

const download = async (url: string, filePath: string) => {
  const res = await fetch(url);
  const file = await Deno.open(filePath, {
    create: true,
    write: true,
  });

  await res.body?.pipeTo(file.writable);
};

const rawGcoresTalkData$: Observable<any[]> = of({
  before: Date.now() / 1000,
}).pipe(
  // raw data
  expand(async ({ before }) => {
    url.searchParams.set("before", `${before}`);
    const res = await fetch(url);
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      return EMPTY;
    }
    return {
      before:
        new Date(
          data.data[data.data.length - 1].attributes["published-at"]
        ).getTime() / 1000,
      ...data,
    };
  }),
  skip(1),
  // debug
  // take(1),
  takeWhile((v) => !!v.data),
  // filter((v) => v.data.length > 0),
  tap((v) => {
    console.info(v);
  }),
  toArray(),
  shareReplay(1)
);

const cookedData$ = rawGcoresTalkData$.pipe(
  mergeAll(),
  mergeMap(({ data, included }): IGcoresTalk[] => {
    // we only need the title as the tags of the talk
    const mapTypeIdToTitle = Object.fromEntries(
      included.map((v: any) => [`${v.type}-${v.id}`, v.attributes.title])
    );
    console.info(mapTypeIdToTitle);
    const talks = data
      .filter((v: any) => v.type === "talks")
      .map((v: any) => {
        /*
        for example
        {
          "blocks": [
            {
              "data": { "spoiler": false },
              "depth": 0,
              "entityRanges": [{ "key": 0, "length": 1, "offset": 0 }],
              "inlineStyleRanges": [],
              "key": "7u4tf",
              "text": "-",
              "type": "atomic"
            },
            {
              "data": { "spoiler": false },
              "depth": 0,
              "entityRanges": [],
              "inlineStyleRanges": [],
              "key": "wisz4",
              "text": "核聚变好玩，和雨川西蒙合了影，见到了做志愿者的 merz，然而社恐差点没敢上前搭话，腿快走断了，给没能来的小朋友们买了点纪念品，Celeste 随机异变速通震撼我妈，全程硬是没把因为震惊而张开的大嘴合上。可惜周天广州下雨航班被取消所以急匆匆买了深圳回上海的高铁票就没去成周天的。",
              "type": "unstyled"
            },
            {
              "data": { "spoiler": false },
              "depth": 0,
              "entityRanges": [],
              "inlineStyleRanges": [],
              "key": "nzffe",
              "text": "",
              "type": "unstyled"
            },
            {
              "data": { "spoiler": false },
              "depth": 0,
              "entityRanges": [],
              "inlineStyleRanges": [],
              "key": "7f8m6",
              "text": "下次还来！",
              "type": "unstyled"
            }
          ],
          "entityMap": {
            "0": {
              "data": {
                "caption": "",
                "images": [
                  {
                    "path": "0ad6514d154c80a9ef6b4b0d6173d132-3024-4032.HEIC",
                    "width": 3024,
                    "height": 4032
                  },
                  {
                    "path": "69cea053377d3155d5f7e22e8584f289-4032-3024.HEIC",
                    "width": 4032,
                    "height": 3024
                  },
                  {
                    "path": "aedf102fa319ce3df2438386f894def4-4032-3024.HEIC",
                    "width": 4032,
                    "height": 3024
                  }
                ]
              },
              "mutability": "IMMUTABLE",
              "type": "GALLERY"
            }
          }
        }
       */
        const content = JSON.parse(v.attributes.content);
        const text = content.blocks
          .filter((v: any) => v.type === "unstyled")
          .map((v: any) => v.text.replace(/\#/, "\\#"))
          .join("\n");

        const images = (content.entityMap?.[0]?.data?.images ?? []).map(
          (v: any) => v.path
        );
        const published_at = new Date(v.attributes["published-at"]).getTime();
        const tags = Object.values(v.relationships as any[])
          .filter((v) => !!v.data)
          .filter((v) => ["topics", "games"].includes(v.data.type))
          .map(({ data }) => mapTypeIdToTitle[`${data.type}-${data.id}`]);
        return {
          text,
          images,
          published_at,
          tags,
        };
      });

    return talks;
  })
);

// cookedData$.pipe(
//   //
//   toArray(),
//   tap((v) =>
//     Deno.writeTextFile(`./content/gcores-talks.json`, JSON.stringify(v))
//   )
// ).subscribe()

cookedData$
  .pipe(
    //
    tap((v) => {
      console.info(v);
    }),
    // delayWhen((v) =>
    //   from(v.images).pipe(
    //     mergeMap(async (imageName) => {
    //       const url = new URL(gcoresImageUrl(imageName));
    //       return await download(
    //         url.toString(),
    //         `./static/images/gcores/${url.pathname}`
    //       );
    //     }),
    //     toArray()
    //   )
    // ),
    map((v: IGcoresTalk): string => {
      const published_time = new Date(v.published_at);
      const title = `## ${published_time.getFullYear()}-${
        published_time.getMonth() + 1
      }-${published_time.getDate()}`;
      const content = v.text;
      const images =
        v.images.length === 0
          ? ""
          : v.images.length !== 1
          ? `{{ slideshow(slides=[${v.images
              .map((v) => `"${localImageUrl(v)}"`)
              .join(",")}]) }}`
          : `![${v.images[0]}](${localImageUrl(v.images[0])})`;
      // const images = "";
      const tags = v.tags.map((v) => `- ${v}`).join("\n");
      // const tags = "";

      return `${title}\n\n${images}\n\n${content}\n\n${tags}\n`;
    }),
    toArray(),
    map(
      (all) =>
        `---\ntitle: '0xc1 的机组日志'\ndate: ${new Date().toISOString()}\n---\n原始链接：[Thrimbda 的机组](https://www.gcores.com/users/464460/talks)\n${all.join(
          "\n\n---\n---\n\n"
        )}`
    ),
    tap((v) => {
      console.info(v);
    }),
    tap((v) => Deno.writeTextFile(`./content/gcores-talks.md`, v))
  )
  .subscribe();
