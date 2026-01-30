---
"title": "0xc1's Crew Log: Life Fragments and Story Sharing"
"summary": "This article is a collection of personal logs published by the author 0xc1 on the Crew platform, spanning from 2023 to 2026. The content is presented in reverse chronological order and includes snippets of daily life, travel experiences (such as travel stories with friend zl, cycling around Qinghai Lake, a trip to the USA), emotional memories (like a college love story), gaming experiences (e.g., *Monster Hunter*, *StarCraft 2*, *Celeste*), film reviews, music sharing, and personal reflections. Through text and images, the logs record the author's growth, friendships, emotional changes, and reflections on life, showcasing a rich emotional world and diverse interests."
"tags":
  - "Personal Journal"
  - "Life Fragments"
  - "Travel Stories"
  - "Emotional Memories"
  - "Gaming Experiences"
  - "Music Sharing"
  - "Thoughts and Reflections"
"date": "2026-01-15"
---

Original link: [Thrimbda's Crew](https://www.gcores.com/users/464460/talks)
## 2026-1-1



Happy New Year!

- 🧩A Slice of Life


---
---

## 2025-12-22

![d5af5a69eb094000a0442d82ea886fe9-500-500.WEBP](https://0xc1.space/images/gcores/d5af5a69eb094000a0442d82ea886fe9-500-500.WEBP)

Hello everyone, does anyone here use the IKEA IDÅSEN sit-stand desk?

- 🧩A Slice of Life


---
---

## 2025-12-8

![edea92f41dafcd310c76d8f702e77f53-2250-3000.jpg](https://0xc1.space/images/gcores/edea92f41dafcd310c76d8f702e77f53-2250-3000.jpg)

Instantly gained a new level of respect for the FamilyMart downstairs—they actually have this!

- 🍺It's All in the Drink


---
---

## 2025-11-6

![a2cab2bc6461eb94ab48cb61ef847080-600-386.JPG](https://0xc1.space/images/gcores/a2cab2bc6461eb94ab48cb61ef847080-600-386.JPG)
![9f41e894ba69904a68d06c1ec654c9fb-3000-2250.jpg](https://0xc1.space/images/gcores/9f41e894ba69904a68d06c1ec654c9fb-3000-2250.jpg)

This is truly the most important thing in the entire universe, and also the most trivial thing not worth mentioning.

- 💓Emotional Wonderland


---
---

## 2025-10-6

![961a8f9a402126fbe802256130d0d9b4-3000-2000.jpg](https://0xc1.space/images/gcores/961a8f9a402126fbe802256130d0d9b4-3000-2000.jpg)

Gazing at each other across the distance, unheard, I wish to follow the moonlight's flow to shine upon you. ☺️

- 🍂The First Hint of Autumn Colors


---
---

## 2025-9-21

![414a10aed2900348bd22126bd6a2042c-1170-1747.jpg](https://0xc1.space/images/gcores/414a10aed2900348bd22126bd6a2042c-1170-1747.jpg)

Who could be happier than him?

- 🧩A Slice of Life


---
---

## 2025-9-15

![c4a828ade12c3439e89eb371441589b7-621-1080.jpg](https://0xc1.space/images/gcores/c4a828ade12c3439e89eb371441589b7-621-1080.jpg)

Believe!

Whatever the outcome, there will only be emotion. Face destiny head-on.

- 🛡️DOTA2 Tournament Discussion


---
---

## 2025-9-14



The most satisfying all-nighter ever, staying up until 6 AM. I'm so hyped, those two team fights were just too beautiful.

- 🛡️DOTA2 Tournament Discussion


---
---

## 2025-9-13



Although I bet on Falcons to win, seeing Marlin open the champagne and type trash talk at halftime, only for BB to make an epic comeback and the whole team tipping/spamming Marlin in all chat was just too satisfying.

All chat / loves to type.

Hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahah<｜fim▁begin｜>
CodingTest


src/Programmers/Level1/문자열내p와y의개수.java


package Programmers.Level1;

public class 문자열내p와y의개수 {
    boolean solution(String s){
        boolean answer = true;
        int p = 0;
        int y = 0;
        for(int i=0; i<s.length(); i++){
            if(s.charAt(i) == 'p' || s.charAt(i) == 'P'){
                p++;
            }else if(s.charAt(i) == 'y' || s.charAt(i) == 'Y'){
                y++;
            }
        }
        if(p != y){
            answer = false;
        }
        return answer;
    }
}


src/Programmers/Level1/문자열다루기기본.java


package Programmers.Level1;

public class 문자열다루기기본 {
    public boolean solution(String s){
        boolean answer = true;
        if(s.length() == 4 || s.length() == 6){
            for(int i=0; i<s.length(); i++){
                if(s.charAt(i) < '0' || s.charAt(i) > '9'){
                    answer = false;
                }
            }
        }else{
            answer = false;
        }
        return answer;
    }
}


src/Programmers/Level1/문자열내림차순으로배치하기.java


package Programmers.Level1;

import java.util.Arrays;
import java.util.Collections;

public class 문자열내림차순으로배치하기 {
    public String solution(String s){
        String answer = "";
        String[] arr = s.split("");
        Arrays.sort(arr, Collections.reverseOrder());
        for(int i=0; i<arr.length; i++){
            answer += arr[i];
        }
        return answer;
    }
}


src/Programmers/Level1/문자열내마음대로정렬하기.java


package Programmers.Level1;

import java.util.Arrays;
import java.util.Comparator;

public class 문자열내마음대로정렬하기 {
    public String[] solution(String[] strings, int n){
        String[] answer = {};
        Arrays.sort(strings, new Comparator<String>(){
            @Override
            public int compare(String s1, String s2){
                if(s1.charAt(n) > s2.charAt(n)){
                    return 1;
                }else if(s1.charAt(n) == s2.charAt(n)){
                    return s1.compareTo(s2);
                }else if(s1.charAt(n) < s2.charAt(n)){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
        answer = strings;
        return answer;
    }
}


src/Programmers/Level1/제일작은수제거하기.java


package Programmers.Level1;

import java.util.ArrayList;
import java.util.Arrays;

public class 제일작은수제거하기 {
    public int[] solution(int[] arr){
        int[] answer = {};
        if(arr.length == 1){
            answer = new int[1];
            answer[0] = -1;
        }else{
            int min = arr[0];
            for(int i=0; i<arr.length; i++){
                if(min > arr[i]){
                    min = arr[i];
                }
            }
            ArrayList<Integer> list = new ArrayList<>();
            for(int i=0; i<arr.length; i++){
                if(arr[i] != min){
                    list.add(arr[i]);
                }
            }
            answer = new int[list.size()];
            for(int i=0; i<list.size(); i++){
                answer[i] = list.get(i);
            }
        }
        return answer;
    }
}


src/Programmers/Level1/정수내림차순으로배치하기.java


package Programmers.Level1;

import java.util.Arrays;
import java.util.Collections;

public class 정수내림차순으로배치하기 {
    public long solution(long n){
        long answer = 0;
        String a = n+"";
        String[] arr = a.split("");
        Arrays.sort(arr, Collections.reverseOrder());
        String b = "";
        for(int i=0; i<arr.length; i++){
            b += arr[i];
        }
        answer = Long.parseLong(b);
        return answer;
    }
}


src/Programmers/Level1/핸드폰번호가리기.java


package Programmers.Level1;

public class 핸드폰번호가리기 {
    public String solution(String phone_number){
        String answer = "";
        for(int i=0; i<phone_number.length()-4; i++){
            answer += "*";
        }
        answer += phone_number.substring(phone_number.length()-4);
        return answer;
    }
}


src/Programmers/Level1/같은숫자는싫어.java


package Programmers.Level1;

import java.util.ArrayList;

public class 같은숫자는싫어 {
    public int[] solution(int[] arr){
        int[] answer = {};
        ArrayList<Integer> list = new ArrayList<>();
        int a = 10;
        for(int i=0; i<arr.length; i++){
            if(arr[i] != a){
                list.add(arr[i]);
                a = arr[i];
            }
        }
        answer = new int[list.size()];
        for(int i=0; i<list.size(); i++){
            answer[i] = list.get(i);
        }
        return answer;
    }
}


src/Programmers/Level1/서울에서김서방찾기.java


package Programmers.Level1;

public class 서울에서김서방찾기 {
    public String solution(String[] seoul){
        String answer = "";
        for(int i=0; i<seoul.length; i++){
            if(seoul[i].equals("Kim")){
                answer = "김서방은 "+i+"에 있다";
            }
        }
        return answer;
    }
}


src/Programmers/Level1/문자열을정수로바꾸기.java


package Programmers.Level1;

public class 문자열을정수로바꾸기 {
    public int solution(String s){
        int answer = 0;
        answer = Integer.parseInt(s);
        return answer;
    }
}


src/Programmers/Level1/수박수박수박수박수박수.java


package Programmers.Level1;

public class 수박수박수박수박수박수 {
    public String solution(int n){
        String answer = "";
        for(int i=0; i<n; i++){
            if(i%2 == 0){
                answer += "수";
            }else{
                answer += "박";
            }
        }
        return answer;
    }
}


src/Programmers/Level1/자릿수더하기.java


package Programmers.Level1;

public class 자릿수더하기 {
    public int solution(int n){
        int answer = 0;
        String a = n+"";
        for(int i=0; i<a.length(); i++){
            answer += a.charAt(i)-'0';
        }
        return answer;
    }
}


src/Programmers/Level1/시저암호.java


package Programmers.Level1;

public class 시저암호 {
    public String solution(String s, int n){
        String answer = "";
        for(int i=0; i<s.length(); i++){
            char ch = s.charAt(i);
            if(ch == ' '){
                answer += ch;
                continue;
            }
            if(ch >= 'a' && ch <= 'z'){
                if(ch+n > 'z'){
                    answer += (char)(ch-26+n);
                }else{
                    answer += (char)(ch+n);
                }
            }else if(ch >= 'A' && ch <= 'Z'){
                if(ch+n > 'Z'){
                    answer += (char)(ch-26+n);
                }else{
                    answer += (char)(ch+n);
                }
            }
        }
        return answer;
    }
}


src/Programmers/Level1/정수제곱근판별.java


package Programmers.Level1;

public class 정수제곱근판별 {
    public long solution(long n){
        long answer = 0;
        double a = Math.sqrt(n);
        if(a%1 == 0){
            answer = (long)Math.pow(a+1,2);
        }else{
            answer = -1;
        }
        return answer;
    }
}


src/Programmers/Level1/나누어떨어지는숫자배열.java


package Programmers.Level1;

import java.util.ArrayList;
import java.util.Arrays;

public class 나누어떨어지는숫자배열 {
    public int[] solution(int[] arr, int divisor){
        int[] answer = {};
        ArrayList<Integer> list = new ArrayList<>();
        for(int i=0; i<arr.length; i++){
            if(arr[i] % divisor == 0){
                list.add(arr[i]);
            }
        }
        if(list.size() == 0){
            answer = new int[1];
            answer[0] = -1;
        }else{
            answer = new int[list.size()];
            for(int i=0; i<list.size(); i++){
                answer[i] = list.get(i);
            }
            Arrays.sort(answer);
        }
        return answer;
    }
}


src/Programmers/Level1/문자열내p와y의개수2.java


package Programmers.Level1;

public class 문자열내p와y의개수2 {
    boolean solution(String s){
        boolean answer = true;
        s = s.toLowerCase();
        int p = 0;
        int y = 0;
        for(int i=0; i<s.length(); i++){
            if(s.charAt(i) == 'p'){
                p++;
            }else if(s.charAt(i) == 'y'){
                y++;
            }
        }
        if(p != y){
            answer = false;
        }
        return answer;
    }
}


src/Programmers/Level1/두정수사이의합.java


package Programmers.Level1;

public class 두정수사이의합 {
    public long solution(int a, int b){
        long answer = 0;
        if(a<b){
            for(int i=a; i<=b; i++){
                answer += i;
            }
        }else if(a>b){
            for(int i=b; i<=a; i++){
                answer += i;
            }
        }else{
            answer = a;
        }
        return answer;
    }
}


src/Programmers/Level1/가운데글자가져오기.java


package Programmers.Level1;

public class 가운데글자가져오기 {
    public String solution(String s){
        String answer = "";
        if(s.length()%2 == 0){
            answer = s.substring(s.length()/2-1, s.length()/2+1);
        }else{
            answer = s.substring(s.length()/2, s.length()/2+1);
        }
        return answer;
    }
}


src/Programmers/Level1/짝수와홀수.java


package Programmers.Level1;

public class 짝수와홀수 {
    public String solution(int num){
        String answer = "";
        if(num%2 == 0){
            answer = "Even";
        }else{
            answer = "Odd";
        }
        return answer;
    }
}


src/Programmers/Level1/평균구하기.java


package Programmers.Level1;

public class 평균구하기 {
    public double solution(int[] arr){
        double answer = 0;
        double sum = 0;
        for(int i=0; i<arr.length; i++){
            sum += arr[i];
        }
        answer = sum/arr.length;
        return answer;
    }
}


src/Programmers/Level1/자연수뒤집어배열로만들기.java


package Programmers.Level1;

public class 자연수뒤집어배열로만들기 {
    public int[] solution(long n){
        int[] answer = {};
        String a = n+"";
        answer = new int[a.length()];
        for(int i=0; i<a.length(); i++){
            answer[i] = (int)(n%10);
            n /= 10;
        }
        return answer;
    }
}


src/Programmers/Level1/약수의합.java


package Programmers.Level1;

public class 약수의합 {
    public int solution(int n){
        int answer = 0;
        for(int i=1; i<=n; i++){
            if(n%i == 0){
                answer += i;
            }
        }
        return answer;
    }
}


src/Programmers/Level1/하샤드수.java


package Programmers.Level1;

public class 하샤드수 {
    public boolean solution(int x){
        boolean answer = true;
        int a = x;
        int sum = 0;
        while(a>0){
            sum += a%10;
            a /= 10;
        }
        if(x%sum != 0){
            answer = false;
        }
        return answer;
    }
}


src/Programmers/Level1/콜라츠추측.java


package Programmers.Level1;

public class 콜라츠추측 {
    public int solution(int num){
        int answer = 0;
        long a = num;
        while(a != 1){
            if(a%2 == 0){
                a /= 2;
            }else{
                a = a*3+1;
            }
            answer++;
            if(answer == 500){
                answer = -1;
                break;
            }
        }
        return answer;
    }
}


src/Programmers/Level1/직사각형별찍기.java


package Programmers.Level1;

import java.util.Scanner;

public class 직사각형별찍기 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        for(int i=0; i<b; i++){
            for(int j=0; j<a; j++){
                System.out.print("*");
            }
            System.out.println();
        }
    }
}


src/Programmers/Level1/이상한문자만들기.java


package Programmers.Level1;

public class 이상한문자만들기 {
    public String solution(String s){
        String answer = "";
        int cnt = 0;
        String[] arr = s.split("");
        for(String ss : arr){
            cnt = ss.contains(" ") ? 0 : cnt+1;
            answer += cnt%2 == 0 ? ss.toLowerCase() : ss.toUpperCase();
        }
        return answer;
    }
}


src/Programmers/Level1/소수찾기.java


package Programmers.Level1;

public class 소수찾기 {
    public int solution(int n){
        int answer = 0;
        int[] arr = new int[n+1];
        for(int i=2; i<=n; i++){
            arr[i] = i;
        }
        for(int i=2; i<=n; i++){
            if(arr[i] == 0){
                continue;
            }
            for(int j=i+i; j<=n; j+=i){
                arr[j] = 0;
            }
        }
        for(int i=2; i<=n; i++){
            if(arr[i] != 0){
                answer++;
            }
        }
        return answer;
    }
}


src/Programmers/Level1/행렬의덧셈.java


package Programmers.Level1;

public class 행렬의덧셈 {
    public int[][] solution(int[][] arr1, int[][] arr2){
        int[][] answer = {};
        answer = new int[arr1.length][arr1[0].length];
        for(int i=0; i<arr1.length; i++){
            for(int j=0; j<arr1[0].length; j++){
                answer[i][j] = arr1[i][j] + arr2[i][j];
            }
        }
        return answer;
    }
}


src/Programmers/Level1/최대공약수와최소공배수.java


package Programmers.Level1;

public class 최대공약수와최소공배수 {
    public int[] solution(int n, int m){
        int[] answer = new int[2];
        int a = n;
        int b = m;
        int r = 1;
        while(b != 0){
            r = a%b;
            a = b;
            b = r;
        }
        answer[0] = a;
        answer[1] = n*m/a;
        return answer;
    }
}


src/Programmers/Level1/x만큼간격이있는n개의숫자.java


package Programmers.Level1;

public class x만큼간격이있는n개의숫자 {
    public long[] solution(int x, int n){
        long[] answer = new long[n];
        long a = x;
        for(int i=0; i<n; i++){
            answer[i] = a;
            a += x;
        }
        return answer;
    }
}


src/Programmers/Level1/완주하지못한선수.java


package Programmers.Level1;

import java.util.Arrays;

public class 완주하지못한선수 {
    public String solution(String[] participant, String[] completion){
        String answer = "";
        Arrays.sort(participant);
        Arrays.sort(completion);
        int i;
        for(i=0; i<completion.length; i++){
            if(!participant[i].equals(completion[i])){
                return participant[i];
            }
        }
        return participant[i];
    }
}


src/Programmers/Level1/2016년.java


package Programmers.Level1;

public class 2016년 {
    public String solution(int a, int b){
        String answer = "";
        String[] day = {"FRI","SAT","SUN","MON","TUE","WED","THU"};
        int[] date = {31,29,31,30,31,30,31,31,30,31,30,31};
        int allDate = 0;
        for(int i=0; i<a-1; i++){
            allDate += date[i];
        }
        allDate += (b-1);
        answer = day[allDate%7];
        return answer;
    }
}


src/Programmers/Level1/문자열내마음대로정렬하기2.java


package Programmers.Level1;

import java.util.Arrays;

public class 문자열내마음대로정렬하기2 {
    public String[] solution(String[] strings, int n){
        String[] answer = {};
        for(int i=0; i<strings.length; i++){
            strings[i] = strings[i].charAt(n) + strings[i];
        }
        Arrays.sort(strings);
        answer = new String[strings.length];
        for(int i=0; i<strings.length; i++){
            answer[i] = strings[i].substring(1);
        }
        return answer;
    }
}


src/Programmers/Level1/체육복.java


package Programmers.Level1;

import java.util.Arrays;

public class 체육복 {
    public int solution(int n, int[] lost, int[] reserve){
        int answer = n - lost.length;
        Arrays.sort(lost);
        Arrays.sort(reserve);
        for(int i=0; i<lost.length; i++){
            for(int j=0; j<reserve.length; j++){
                if(lost[i] == reserve[j]){
                    answer++;
                    lost[i] = -1;
                    reserve[j] = -1;
                    break;
                }
            }
        }
        for(int i=0; i<lost.length; i++){
            for(int j=0; j<reserve.length; j++){
                if(lost[i]-1 == reserve[j] || lost[i]+1 == reserve[j]){
                    answer++;
                    reserve[j] = -1;
                    break;
                }
            }
        }
        return answer;
    }
}


src/Programmers/Level1/다트게임.java


package Programmers.Level1;

public class 다트게임 {
    public int solution(String dartResult){
        int answer = 0;
        int[] dart = new int[3];
        int n=0, idx=0;
        String numStr = "";
        for(int i=0; i<dartResult.length(); i++){
            char c = dartResult.charAt(i);
            if(c >= '0' && c <= '9'){
                numStr += String.valueOf(c);
            }else if(c == 'S' || c == 'D' || c == 'T'){
                n = Integer.parseInt(numStr);
                if(c == 'S'){
                    dart[idx++] = (int)Math.pow(n,1);
                }else if(c == 'D'){
                    dart[idx++] = (int)Math.pow(n,2);
                }else{
                    dart[idx++] = (int)Math.pow(n,3);
                }
                numStr = "";
            }else{
                if(c == '*'){
                    dart[idx-1] *= 2;
                    if(idx-2 >= 0){
                        dart[idx-2] *= 2;
                    }
                }else{
                    dart[idx-1] *= (-1);
                }
            }
        }
        answer = dart[0] + dart[1] + dart[2];
        return answer;
    }
}


src/Programmers/Level1/모의고사.java


package Programmers.Level1;

import java.util.ArrayList;

public class 모의고사 {
    public int[] solution(int[] answers){
        int[] answer = {};
        int[] person1 = {1,2,3,4,5};
        int[] person2 = {2,1,2,3,2,4,2,5};
        int[] person3 = {3,3,1,1,2,2,4,4,5,5};
        int answer1=0, answer2=0, answer3=0;
        for(int i=0; i<answers.length; i++){
            if(person1[i%person1.length] == answers[i]){
                answer1++;
            }
            if(person2[i%person2.length] == answers[i]){
                answer2++;
            }
            if(person3[i%person3.length] == answers[i]){
                answer3++;
            }
        }
        int max = Math.max(Math.max(answer1, answer2), answer3);
        ArrayList<Integer> list = new ArrayList<>();
        if(max == answer1){
            list.add(1);
        }
        if(max == answer2){
            list.add(2);
        }
        if(max == answer3){
            list.add(3);
        }
        answer = new int[list.size()];
        for(int i=0; i<answer.length; i++){
            answer[i] = list.get(i);
        }
        return answer;
    }
}


src/Programmers/Level1/두개뽑아서더하기.java


package Programmers.Level1;

import java.util.ArrayList;
import java.util.Collections;

public class 두개뽑아서더하기 {
    public int[] solution(int[] numbers){
        int[] answer = {};
        ArrayList<Integer> list = new ArrayList<>();
        for(int i=0; i<numbers.length; i++){
            for(int j=i+1; j<numbers.length; j++){
                int a = numbers[i] + numbers[j];
                if(list.indexOf(a) < 0){
                    list.add(a);
                }
            }
        }
        Collections.sort(list);
        answer = new int[list.size()];
        for(int i=0; i<list.size(); i++){
            answer[i] = list.get(i);
        }
        return answer;
    }
}


src/Programmers/Level1/예산.java


package Programmers.Level1;

import java.util.Arrays;

public class 예산 {
    public int solution(int[] d, int budget){
        int answer = 0;
        Arrays.sort(d);
        for(int i=0; i<d.length; i++){
            budget -= d[i];
            if(budget < 0){
                break;
            }
            answer++;
        }
        return answer;
    }
}


src/Programmers/Level1/소수만들기.java


package Programmers.Level1;

public class 소수만들기 {
    public int solution(int[] nums){
        int answer = 0;
        for(int i=0; i<nums.length; i++){
            for(int j=i+1; j<nums.length; j++){
                for(int k=j+1; k<nums.length; k++){
                    int sum = nums[i] + nums[j] + nums[k];
                    if(isPrime(sum)){
                        answer++;
                    }
                }
            }
        }
        return answer;
    }
    public boolean isPrime(int num){
        for(int i=2; i<num; i++){
            if(num%i == 0){
                return false;
            }
        }
        return true;
    }
}


src/Programmers/Level1/실패율.java


package Programmers.Level1;

import java.util.ArrayList;
import java.util.Collections;

public class 실패율 {
    public int[] solution(int N, int[] stages){
        int[] answer = new int[N];
        double[] stage = new double[N+1];
        for(int i : stages){
            if(i == N+1){
                continue;
            }
            stage[i]++;
        }
        ArrayList<Double> fail = new ArrayList<>();
        double num = stages.length;
        double tmp = 0;
        for(int i=1; i<stage.length; i++){
            tmp = stage[i];
            if(num == 0){
                stage[i] = 0;
            }else{
                stage[i] = stage[i]/num;
                num = num - tmp;
            }
            fail.add(stage[i]);
        }
        Collections.sort(fail, Collections.reverseOrder());
        for(int i=0; i<fail.size(); i++){
            for(int j=1; j<stage.length; j++){
                if(fail.get(i) == stage[j]){
                    answer[i] = j;
                    stage[j] = -1;
                    break;
                }
            }
        }
        return answer;
    }
}


src/Programmers/Level1/크레인인형뽑기게임.java


package Programmers.Level1;

import java.util.Stack;

public class 크레인인형뽑기게임 {
    public int solution(int[][] board, int[] moves){
        int answer = 0;
        Stack<Integer> stack = new Stack<>();
        for(int move : moves){
            for(int j=0; j<board.length; j++){
                if(board[j][move-1] != 0){
                    if(stack.isEmpty()){
                        stack.push(board[j][move-1]);
                        board[j][move-1] = 0;
                        break;
                    }
                    if(board[j][move-1] == stack.peek()){
                        stack.pop();
                        answer += 2;
                    }else{
                        stack.push(board[j][move-1]);
                    }
                    board[j][move-1] = 0;
                    break;
                }
            }
        }
        return answer;
    }
}


src/Programmers/Level1/비밀지도.java


package Programmers.Level1;

public class 비밀지도 {
    public String[] solution(int n, int[] arr1, int[] arr2){
        String[] answer = new String[n];
        for(int i=0; i<n; i++){
            answer[i] = Integer.toBinaryString(arr1[i] | arr2[i]);
        }
        for(int i=0; i<n; i++){
            answer[i] = String.format("%"+n+"s", answer[i]);
            answer[i] = answer[i].replaceAll("1","#");
            answer[i] = answer[i].replaceAll("0"," ");
        }
        return answer;
    }
}


src/Programmers/Level1/문자열내p와y의개수3.java


package Programmers.Level1;

public class 문자열내p와y의개수3 {
    boolean solution(String s){
        boolean answer = true;
        s = s.toUpperCase();
        int count = 0;
        for(int i=0; i<s.length(); i++){
            if(s.charAt(i) == 'P'){
                count++;
            }else if(s.charAt(i) == 'Y'){
                count--;
            }
        }
        if(count != 0){
            answer = false;
        }
        return answer;
    }
}


src/Programmers/Level1/삼진법뒤집기.java


package Programmers.Level1;

public class 삼진법뒤집기 {
    public int solution(int n){
        int answer = 0;
        String a = "";
        while(n>0){
            a = (n%3) + a;
            n /= 3;
        }
        a = new StringBuilder(a).reverse().toString();
        answer = Integer.parseInt(a,3);
        return answer;
    }
}


src/Programmers/Level1/키패드누르기.java


package Programmers.Level1;

public class 키패드누르기 {
    public String solution(int[] numbers, String hand){
        String answer = "";
        int left = 10;
        int right = 12;
        for(int i=0; i<numbers.length; i++){
            if(numbers[i] == 1 || numbers[i] == 4 || numbers[i] == 7){
                answer += "L";
                left = numbers[i];
            }else if(numbers[i] == 3 || numbers[i] == 6 || numbers[i] == 9){
                answer += "R";
                right = numbers[i];
            }else{
                if(numbers[i] == 0){
                    numbers[i] = 11;
                }
                int leftDist = Math.abs(numbers[i] - left) / 3 + Math.abs(numbers[i] - left) % 3;
                int rightDist = Math.abs(numbers[i] - right) / 3 + Math.abs(numbers[i] - right) % 3;
                if(leftDist < rightDist){
                    answer += "L";
                    left = numbers[i];
                }else if(leftDist > rightDist){
                    answer += "R";
                    right = numbers[i];
                }else{
                    if(hand.equals("left")){
                        answer += "L";
                        left = numbers[i];
                    }else{
                        answer += "R";
                        right = numbers[i];
                    }
                }
            }
        }
        return answer;
    }
}


src/Programmers/Level1/내적.java


package Programmers.Level1;

public class 내적 {
    public int solution(int[] a, int[] b){
        int answer = 0;
        for(int i=0; i<a.length; i++){
            answer += a[i] * b[i];
        }
        return answer;
    }
}


src/Programmers/Level1/음양더하기.java


package Programmers.