---
title: Protocol Buffer说明文档
date: 2017-04-03
---

# 语言指南(proto3)

本文档介绍了如何使用 Protocol Buffer 语言来将你的 Protocol Buffer 数据结构化，这包括`.proto`文件语法以及该如何从你的`.proto`文件中生成数据访问类，本文档覆盖了 Protocol Buffer 的 proto3 版本，有关于 proto2 的语法说明，请移步 [proto2 语言指南](https://developers.google.com/protocol-buffers/docs/proto)。

## 定义Message类型

首先让我们来看一个非常简单的例子，假设你想要定义一个用于请求搜索的数据（Message）格式，每个搜索请求拥有一个查询字符串、你所需要的页码以及每页显示结果的数量。那么这就是你将要用来定义这个数据格式的`.proto`文件。

```java
syntax = "proto3";

message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

+ 第一行指定了你要求使用proto3语法，如果你没有显式声明语法的话，Protocol Buffer 编译器将会默认你使用proto2语法。且语法声明必须在`.proto`文件的第一（非空、非注释）行。
+ `SearchRequest` Message 类型定义声明了三个字段（键值对），包括了你想定义在这条 Message 中的每一个字段，每个字段都有自己的字段类型和字段名。

### 为字段指定类型

在上面的例子中，所有的字段均为 [标量类型](https://developers.google.com/protocol-buffers/docs/proto3#scalar)：两个整型变量（page_number、result_per_page）和一个字符串（query）。但你也可以将你的字段声明为复合类型，包括[枚举类型](https://developers.google.com/protocol-buffers/docs/proto3#enum)和其他 Message 类型。

### 分配标签https://developers.google.com/protocol-buffers/docs/proto3#enum

正如上述 Message 类型所显示的，每个字段都有一个**独特的数字标签**。这些标签是用来唯一识别你的字段在[二进制形式](https://developers.google.com/protocol-buffers/docs/encoding)下的格式的，因此在 Message 定义好之后就不应该对标签再进行改动了。请注意标签范围在1到15这个区间时与数据类型一起编码后只占用1字节（你可以在[Protocol Buffer编码](https://developers.google.com/protocol-buffers/docs/encoding)中进行更深入的学习）。当标签在16-2047这个范围内将会编码为2字节。因此你应该把1-15范围内的标签分配给最常使用的字段。请记得给将来可能添加的经常使用的字段留下空间。

你可以分配最小的标签是1，最大为2^29 - 1，或者说536,870,911。范围在19000到19999的标签同样不允许被使用（`FieldDescriptor::kFirstReservedNumber` 到 `FieldDescriptor::kLastReservedNumber`），因为这个范围内的字段为Protocol Buffer的实现做了保留——如果你在`.proto`中使用了任意一个保留标签，Protocol Buffer编译器做出抗议。简单来说，你不应该使用任何一个[保留](https://developers.google.com/protocol-buffers/docs/proto3#reserved)标签。

### 指定字段规则

Message字段可以是一下几种中的任意一种：

+ 单值字段：一个定义良好的Message可以有零个或一个这种字段（但不能比一个多）。
+ `repeated`：该字段可以被重复任意次（包括零次），`repeated`字段中值的顺序会被保存下来。（译注：类似数组）

在proto3中，使用scalar数值类型的`repeated`字段会默认使用`packed`编码方式。

你可以在[Protocol Buffer编码](https://developers.google.com/protocol-buffers/docs/encoding)中对`packed`编码进行更深入的了解。

### 添加多个Message型字段

`.proto`文件支持同时定义多个Message类型。这在你需要定义多个相关Message时很有用——因此，举例来说，如果你想定义一个用来作为你的`SearchRequest`响应Message类型，你可以将其添加进同一个`.proto`文件：

```java
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}

message SearchResponse {
 ...
}
```

### 添加注释

`.proto`使用C/C++风格的`//`注释语法

```java
message SearchRequest {
  string query = 1;
  int32 page_number = 2;  // Which page number do we want?
  int32 result_per_page = 3;  // Number of results to return per page.
}
```

### 保留字段

如果你通过移除整个字段（或将其注释掉）来[更新](https://developers.google.com/protocol-buffers/docs/proto3#updating)Message，那么将来使用者在更新时可能重用这些空出来的标签。在他们导入旧版本的`.proto`文件时可能导致一些问题，包括数据冲突，隐私问题等。一种解决方案是将这些你所删除的字段标签指定为`reserved`。如此以来在未来使用者试图使用这些标签时Protocol Buffer编译器会提出警告。

```java
message Foo {
  reserved 2, 15, 9 to 11;
  reserved "foo", "bar";
}
```

请注意`reserved`不能混合声明字段名与数字标签。

### 你的 .proto 文件会生成什么？

当你对`.proto`文件使用[Protocol Buffer编译器](https://developers.google.com/protocol-buffers/docs/proto3#generating)时，编译器会生成你所指定语言的代码，用来操作你在文件中声明的Message类型，包括一些get和set方法，将你的Message序列化到Output Stream或从Input Stream中解析Message。

+ 对于C++，编译器会针对每一个`.proto`生成一个`.h`和一个`.cc`文件，其中包括一个用来描述每个Message的类。
+ 对于java，编译器会针对每一个`.proto`生成一个`.java`文件，和一个用来将Message类实例化的特殊`Builder`类。
+ Python稍有不同——Python编译器会生成一个的模块，带有针对`.proto`中每一个字段的静态表述符，这将被用来作为*metaclass* ，用来在运行时生成必要的Python数据访问类。
+ 对于Go，编译器会生成一个针对每一个Message类型的Go类型`.pb.go` 文件。
+ 对于Ruby，编译器会生成一个Ruby模块`.rb`文件其中囊括了你的Message类型。
+ 对于JavaNano，编译器生成的文件类似Java输出但不包括`Builder`类。
+ 对于Objective-C，编译器会针对每一个`.proto`生成一个`pbobjc.h`和一个`pbobjc.m`文件，其中包括一个用来描述每个Message的类。
+ 对于C#，编译器会针对每一个`.proto`文件生成`.cs`文件，其中包括一个用来描述每个Message的类。

关于使用API，你可以通过学习针对你所选择的语言的教程（proto3版本即将来临）来发现更多。对于更多
API细节，请移步相应的[API参考手册](https://developers.google.com/protocol-buffers/docs/reference/overview)（proto3版本即将来临）。

## 标量类型

一个标量Message字段允许包括下列类型——表格展示了允许在`.proto`中出现的类型，以及其在特定语言的生成文件的相关类型：

| .proto Type | Notes                                    | C++ Type | Java Type  | Python Type[2] | Go Type | Ruby Type                      | C# Type    | PHP Type          |
| ----------- | ---------------------------------------- | -------- | ---------- | -------------- | ------- | ------------------------------ | ---------- | ----------------- |
| double      |                                          | double   | double     | float          | float64 | Float                          | double     | float             |
| float       |                                          | float    | float      | float          | float32 | Float                          | float      | float             |
| int32       | 使用定长变量编码，对于负数无效——如果你的变量可能含有负数，请使用sint32替代。 | int32    | int单值      | int            | int32   | Fixnum or Bignum (as required) | int        | integer           |
| int64       | 使用定长变量编码，对于负数无效——如果你的变量可能含有负数，请使用sint64替代。 | int64    | long单值     | int/long[3]    | int64   | Bignum                         | long       | integer/string[5] |
| uint32      | 使用定长变量编码。                                | uint32   | int[1]     | int/long[3]    | uint32  | Fixnum or Bignum (as required) | uint       | integer           |
| uint64      | 使用定长变量编码。                                | uint64   | long[1]    | int/long[3]    | uint64  | Bignum                         | ulong      | integer/string[5] |
| sint32      | 使用定长变量编码，带符号值，该类型用来编码负数时笔int32更高效。       | int32单值  | int        | int            | int32   | Fixnum or Bignum (as required) | int        | integer           |
| sint64      | 使用定长变量编码，带符号值，该类型用来编码负数时笔int64更高效。       | int64    | long       | int/long[3]    | int64   | Bignum                         | long       | integer/string[5] |
| fixed32     | 占且一定占4字节，编码大于2^28的数字时比uint32更有效。         | uint32   | int[1]     | int            | uint32  | Fixnum or Bignum (as required) | uint       | integer           |
| fixed64     | 占且一定占8字节，编码大于2^56的数字时比uint64更有效。         | uint64   | long[1]    | int/long[3]    | uint64  | Bignum                         | ulong      | integer/string[5] |
| sfixed32    | 占且一定占4字节。                                | int32    | int        | int            | int32   | Fixnum or Bignum (as required) | int        | integer           |
| sfixed64    | 占且一定占8字节。                                | int64    | long       | int/long[3]    | int64   | Bignum                         | long       | integer/string[5] |
| bool        |                                          | bool     | boolean    | bool           | bool    | TrueClass/FalseClass           | bool       | boolean           |
| string      | 一个只含有UTF-8编码或7位ASCII码字符串。                | string   | String     | str/unicode[4] | string  | String (UTF-8)                 | string     | string            |
| bytes       | 可以包含任意字节序列。                              | string   | ByteString | str            | []byte  | String (ASCII-8BIT)            | ByteString | string            |

你可以在[Protocol Buffer编码](https://developers.google.com/protocol-buffers/docs/encoding)中对这些类型编码进行更深入的了解。

[1] 在Java中，无符号32位和64位整形数字通过它们的有符号副本来表示，将第一位置为符号位。

[2] 在所有情况下，对字段进行set操作都会检查类型，确保操作合法。

[3] 64位或无符号32位整形在解码时总是通过long型表示，但当通过int型值set字段时也可以通过int型表示。

[4] Python字符串在解码时总是通过Unicode表示，但当通过ASCII型值set字段时也可以通过int型表示。

[5] 整形在64位机上使用，字符串在32位机上使用。

## 默认值

当一个Message在被解析时，如果被编码的Message没有包含一个具有确切值的单值元素，则相应的被解析字段会被设置为该字段的默认值。这些默认值是通过类型区分的。

+ 对于字符串类型，默认值为空串。
+ 对于字节数组类型，默认值为空数组。
+ 对于布尔类型，默认值为false
+ 对于数值类型，默认值为0
+ 对于[枚举类型](https://developers.google.com/protocol-buffers/docs/proto3#enum)，默认值为所定义的第一个枚举值，其必为0。
+ 对于Message字段，其字段未设置值时，确切的默认值跟语言有关，详情请看[生成代码指南](https://developers.google.com/protocol-buffers/docs/reference/overview)。

repeated字段的默认值为空（一般来说是对应语言的一个空列表）。

请注意对于标量Message字段，一旦一个Message已经被解析，那么其字段是否被设置为默认值（比如一个布尔类型字段是否被设置为false）或未被赋值就无从知晓了：你应该在定义Message时就始终牢记这一点。举例来讲，请不要让一个布尔类型在被设置为false时触发某动作——如果你不想让该动作默认触发的话。同时请注意，如果一个标量被置为其默认值，则其默认值在传输时是不会被序列化的。

如想获取更多有关你选择的语言的默认值工作原理，请移步[生成代码指南](https://developers.google.com/protocol-buffers/docs/reference/overview)。

## 枚举类型

当你定义了一个Message类型时，你也许会希望其中一个字段只能够在一些预定义的列表中选择。举例来讲，假如你想给每个`SearchRequest`添加一个`corpus`字段，同时其值可以是`UNIVERSAL`，`WEB`，`IMAGES`，`LOCAL`，`NEWS`，`PRODUCTS`或者`VIDEO`。你可以通过在Message中添加一个`enum` 定义上述每一个恒量来做到这点。

在下述例子中我们添加了一个定义了所有可能值的`enum`起名字叫做`Corpus`，并添加该字段。

```java
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
  enum Corpus {
    UNIVERSAL = 0;
    WEB = 1;
    IMAGES = 2;
    LOCAL = 3;
    NEWS = 4;
    PRODUCTS = 5;
    VIDEO = 6;
  }
  Corpus corpus = 4;
}
```

可以看到，`Corpus`的枚举值中第一个恒量映射到零：每个定义的枚举值都必须将其第一个恒量元素映射到0。这是因为：

+ 必须有一个0值，如此以来我们才能够使用0作为一个数值型[默认值](https://developers.google.com/protocol-buffers/docs/proto3#default)。
+ 0值必须作为第一个元素，为了与[proto2](https://developers.google.com/protocol-buffers/docs/proto)中第一个元素必为默认值的语法兼容。


你可以通过把相同的值分配给不同的枚举变量来定义枚举变量的别名。当你要设置别名时需要将`allow_alias`选项设置为`true`，否则 Protocol Buffers 编译器在找到你试图定义的别名时会报错。

```java
enum EnumAllowingAlias {
  option allow_alias = true;
  UNKNOWN = 0;
  STARTED = 1;
  RUNNING = 1;
}
enum EnumNotAllowingAlias {
  UNKNOWN = 0;
  STARTED = 1;
  // RUNNING = 1;  // 将这行取消注释将会导致一个编译器内部错误和一个外部的警告信息。
}
```

枚举变量值必须在32位整形数所能表示的范围之内，因为`enum`值使用[varint encoding](https://developers.google.com/protocol-buffers/docs/encoding)编码，