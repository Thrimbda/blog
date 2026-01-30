---
"title": "Worktileの要求管理実力分析"
"summary": "本稿は『人月の神話』におけるバベルの塔の失敗事例から始め、要求管理の失敗原因はコミュニケーションの欠如、組織化の欠如、システム範囲の過大さにあると指摘します。続いて、Worktileプロジェクト管理ツールの特徴、すなわちカンバン式タスク管理、ファイル同期、共有チームカレンダー、メッセージ通知、分析統計ビューを紹介します。その後、Worktileを用いた要求管理のプロセス（要求提出、審査、実施、確認、測定）を詳細に説明し、Worktileがタスクリスト、ラベル、優先度、統計分析を通じて要求管理の問題をどのように解決するかを示します。最後に、Worktileが要求管理、人員組織、コミュニケーションなどの問題を解決できると結論づけ、要求管理は他のプロジェクト管理要素と組み合わせるべきであると強調しています。"
"tags":
  - "要求管理"
  - "Worktile"
  - "プロジェクト管理"
  - "システム分析"
  - "タスクコラボレーション"
  - "カンバン"
  - "チームコラボレーション"
  - "要求分析"
"date": "2017-04-06"
---

---
title: Worktileの要求管理実力分析
date: 2017-04-06
taxonomies:
  tags:
    - 要求分析
    - システム分析と設計
---

# 要求管理

まず、『人月の神話』から、プロジェクト管理に関する典型的な失敗例を一部抜粋します。

<!--more-->

> **バベルの塔の管理教訓**
>
> 『創世記』によれば、バベルの塔はノアの箱舟に次ぐ人類第二の大工事でしたが、同時に最初の完全な失敗工事でもありました。
>
> この物語は多くの点で、さまざまなレベルにおいて非常に示唆に富み、教育的です。純粋な工事プロジェクトとして捉え、管理面で学ぶべき教訓は何かを見てみましょう。このプロジェクトの前提条件はどれほど良かったのでしょうか？彼らは以下を持っていましたか：
>
> 1. 明確な目標？
>
>    はい。不可能に近いほど幼稚ではありましたが、プロジェクトはこの基本的な制限に直面するはるか前に失敗していました。
>
> 2. 人的資源？
>
>    非常に豊富でした。
>
> 3. 材料？
>
>    メソポタミアには豊富な土とアスファルトがありました。
>
> 4. 十分な時間？
>
>    はい。時間制限の兆候は一切ありませんでした。
>
> 5. 十分な技術？
>
>    はい。ピラミッドまたは円錐形の構造自体が安定しており、圧力負荷をうまく分散できます。煉瓦建築技術についても、人々は深く研究していました。同様に、プロジェクトは技術的限界に達するはるか前に失敗していました。
>
> では、これらすべての条件を備えていたのに、なぜプロジェクトは失敗したのでしょうか？彼らに欠けていたものは何でしょうか？二つの側面です——**コミュニケーション**、そしてコミュニケーションの結果としての**組織化**です。彼らは互いに話すことができず、協力することができませんでした。協力が進まないと、作業は停滞しました。史書の行間から推測すると、コミュニケーションの欠如が論争、欲求不満、集団猜疑心を引き起こしました。すぐに、部族は分裂し始めました—— 人々は互いに争うよりも孤立を選んだのです。

著者は分析の結果、この失敗したプロジェクトの原因が以下の点にあるとしています：

- コミュニケーションが取れない
# 1. 概述

本文，我们来分享 MyBatis 的日志模块，对应 `logging` 包。如下图所示：[![`logging` 包](http://static.iocoder.cn/images/MyBatis/2020_01_07/01.png)](http://static.iocoder.cn/images/MyBatis/2020_01_07/01.png)`logging` 包

在 [《精尽 MyBatis 源码解析 —— 项目结构一览》](http://svip.iocoder.cn/MyBatis/intro) 中，简单介绍了这个模块如下：

> 无论在开发测试环境中，还是在线上生产环境中，日志在整个系统中的地位都是非常重要的。良好的日志功能可以帮助开发人员和测试人员快速定位 Bug 代码，也可以帮助运维人员快速定位性能瓶颈等问题。目前的 Java 世界中存在很多优秀的日志框架，例如 Log4j、 Log4j2、Apache Commons Log、java.util.logging、slf4j 等。
>
> MyBatis 作为一个设计优良的框架，除了提供详细的日志输出信息，还要能够集成多种日志框架，其日志模块的一个主要功能就是**集成第三方日志框架**。

本文涉及的类如下图所示：<img src="http://ahaolin-public-img.oss-cn-hangzhou.aliyuncs.com/img/202201141000201.png" alt="img" style="zoom:150%;" />

- 从图的**右上角**，我们可以看到 MyBatis 直接集成了很多第三方的日志框架。
- 从图的**左下角**，我们可以看到有一个 Jdk 的日志框架，还有一个 `stderr` 标准输入输出。😈 实际上，`stderr` 不算一个日志框架，仅仅当无法找到第三方日志框架时，会使用它来打印日志。
- 从图的**中间**，我们可以看到 `slf4j` 这个日志门面。关于这个概念，不了解的胖友，可以 Google 一下。

下面，我们按照图的**左上角**到**右下角**的顺序，逐个日志框架来分享。

# 2. LogFactory

`org.apache.ibatis.logging.LogFactory` ，Log 工厂类。

## 2.1 构造方法

```java
// LogFactory.java

/**
 * Marker to be used by logging implementations that support markers
 */
public static final String MARKER = "MYBATIS";

/**
 * 使用的 Log 的构造方法
 */
private static Constructor<? extends Log> logConstructor;

static {
    // <1> 逐个尝试，判断使用哪个 Log 的实现类，即初始化 logConstructor 属性
    tryImplementation(LogFactory::useSlf4jLogging);
    tryImplementation(LogFactory::useCommonsLogging);
    tryImplementation(LogFactory::useLog4J2Logging);
    tryImplementation(LogFactory::useLog4JLogging);
    tryImplementation(LogFactory::useJdkLogging);
    tryImplementation(LogFactory::useNoLogging);
}
```

- `<1>` 处，在类的静态代码块中，会按照 `slf4j` -> `commonsLogging` -> `log4j2` -> `log4j` -> `jdkLogging` -> `noLogging` 的顺序，逐个尝试，判断使用哪个 Log 的实现类，即初始化 `logConstructor` 属性。

- `#tryImplementation(Runnable runnable)` 方法，尝试调用方法，如果成功，则不再尝试。代码如下：

  ```java
  // LogFactory.java
  
  private static void tryImplementation(Runnable runnable) {
      if (logConstructor == null) {
          try {
              runnable.run();
          } catch (Throwable t) {
              // ignore
          }
      }
  }
  ```

- `#useXXXLogging()` 方法，尝试使用对应的 Log 的实现类。代码如下：

  ```java
  // LogFactory.java
  
  public static synchronized void useSlf4jLogging() {
      setImplementation(org.apache.ibatis.logging.slf4j.Slf4jImpl.class);
  }
  
  public static synchronized void useCommonsLogging() {
      setImplementation(org.apache.ibatis.logging.commons.JakartaCommonsLoggingImpl.class);
  }
  
  public static synchronized void useLog4JLogging() {
      setImplementation(org.apache.ibatis.logging.log4j.Log4jImpl.class);
  }
  
  public static synchronized void useLog4J2Logging() {
      setImplementation(org.apache.ibatis.logging.log4j2.Log4j2Impl.class);
  }
  
  public static synchronized void useJdkLogging() {
      setImplementation(org.apache.ibatis.logging.jdk14.Jdk14LoggingImpl.class);
  }
  
  public static synchronized void useStdOutLogging() {
      setImplementation(org.apache.ibatis.logging.stdout.StdOutImpl.class);
  }
  
  public static synchronized void useNoLogging() {
      setImplementation(org.apache.ibatis.logging.nologging.NoLoggingImpl.class);
  }
  ```

  - 每个方法，都调用了 `#setImplementation(Class<? extends Log> implClass)` 方法，尝试初始化 `logConstructor` 属性。代码如下：

    ```java
    // LogFactory.java
    
    private static void setImplementation(Class<? extends Log> implClass) {
        try {
            // 获得参数为 String 的构造方法
            Constructor<? extends Log> candidate = implClass.getConstructor(String.class);
            // 创建 Log 对象
            Log log = candidate.newInstance(LogFactory.class.getName());
            if (log.isDebugEnabled()) {
                log.debug("Logging initialized using '" + implClass + "' adapter.");
            }
            // 创建成功，意味着可以使用，设置为 logConstructor
            logConstructor = candidate;
        } catch (Throwable t) {
            throw new LogException("Error setting Log implementation.  Cause: " + t, t);
        }
    }
    ```

    - 在该方法中，我们可以看到，Log 的实现类，需要有一个参数为 `String.class` 的构造方法。例如，`org.apache.ibatis.logging.slf4j.Slf4jImpl` 的构造方法，代码如下：

      ```java
      // Slf4jImpl.java
      
      public Slf4jImpl(String clazz) {
          Logger logger = LoggerFactory.getLogger(clazz);
      
          if (logger instanceof LocationAwareLogger) {
              try {
                  // check for slf4j >= 1.6 method signature
                  logger.getClass().getMethod("log", Marker.class, String.class, int.class, String.class, Object[].class, Throwable.class);
                  log = new Slf4jLocationAwareLoggerImpl((LocationAwareLogger) logger);
                  return;
              } catch (SecurityException e) {
                  // fail-back to Slf4jLoggerImpl
              } catch (NoSuchMethodException e) {
                  // fail-back to Slf4jLoggerImpl
              }
          }
      
          // Logger is not LocationAwareLogger or slf4j version < 1.6
          log = new Slf4jLoggerImpl(logger);
      }
      ```

      - 通过这样的方式，创建了 `log` 属性。后续，在 Slf4jImpl 中，会使用该 `log` 属性，打印日志。

## 2.2 getLog

`#getLog(...)` 方法，获得 Log 对象。代码如下：

```java
// LogFactory.java

public static Log getLog(Class<?> aClass) {
    return getLog(aClass.getName());
}

public static Log getLog(String logger) {
    try {
        return logConstructor.newInstance(logger);
    } catch (Throwable t) {
        throw new LogException("Error creating logger for logger " + logger + ".  Cause: " + t, t);
    }
}
```

- 通过调用 `logConstructor` 的构造方法，创建 Log 对象。

## 2.3 小结

LogFactory 负责创建 Log 对象。但是实际上，它内部管理的是 Log 实现类的构造方法。并且，通过 `tryImplementation` 方法，实现按照 `slf4j` -> `commonsLogging` -> `log4j2` -> `log4j` -> `jdkLogging` -> `noLogging` 的顺序，尝试使用对应的 Log 的实现类。

# 3. Log

`org.apache.ibatis.logging.Log` ，MyBatis Log 接口。代码如下：

```java
// Log.java

public interface Log {

    boolean isDebugEnabled();

    boolean isTraceEnabled();

    void error(String s, Throwable e);

    void error(String s);

    void debug(String s);

    void trace(String s);

    void warn(String s);

}
```

- 和主流的日志框架的接口，基本一致。

## 3.1 各实现类

Log 的实现类，如下图所示：[![Log 的实现类](http://static.iocoder.cn/images/MyBatis/2020_01_07/02.png)](http://static.iocoder.cn/images/MyBatis/2020_01_07/02.png)Log 的实现类

- 每个实现类，对应一个第三方的日志框架。所以，每个实现类的代码，都是非常相似的。😈 所以，我们仅仅选择 `slf4j` 包下的实现类，进行分享。

## 3.2 Slf4jImpl

`org.apache.ibatis.logging.slf4j.Slf4jImpl` ，实现 Log 接口，SLF4J 实现类。代码如下：

```java
// Slf4jImpl.java

public class Slf4jImpl implements Log {

    /**
     * SLF4J Logger 对象
     */
    private Log log;

    public Slf4jImpl(String clazz) {
        // 获得 Logger 对象
        Logger logger = LoggerFactory.getLogger(clazz);

        // 如果使用 LocationAwareLogger ，则创建 Slf4jLocationAwareLoggerImpl 对象
        if (logger instanceof LocationAwareLogger) {
            try {
                // check for slf4j >= 1.6 method signature
                // 首先，检查是否存在 `log(Marker marker, String fqcn, int level, String message, Object[] argArray, Throwable t)` 方法。如果有，则意味着可以使用 LocationAwareLogger 对象。实际上，这里使用了桥接模式，Slf4jLocationAwareLoggerImpl 实现 Log 接口，内部组合 LocationAwareLogger 对象。
                logger.getClass().getMethod("log", Marker.class, String.class, int.class, String.class, Object[].class, Throwable.class);
                log = new Slf4jLocationAwareLoggerImpl((LocationAwareLogger) logger);
                return;
            } catch (SecurityException e) {
                // fail-back to Slf4jLoggerImpl
            } catch (NoSuchMethodException e) {
                // fail-back to Slf4jLoggerImpl
            }
        }

        // 否则，创建 Slf4jLoggerImpl 对象
        // Logger is not LocationAwareLogger or slf4j version < 1.6
        log = new Slf4jLoggerImpl(logger);
    }

    @Override
    public boolean isDebugEnabled() {
        return log.isDebugEnabled();
    }

    @Override
    public boolean isTraceEnabled() {
        return log.isTraceEnabled();
    }

    @Override
    public void error(String s, Throwable e) {
        log.error(s, e);
    }

    @Override
    public void error(String s) {
        log.error(s);
    }

    @Override
    public void debug(String s) {
        log.debug(s);
    }

    @Override
    public void trace(String s) {
        log.trace(s);
    }

    @Override
    public void warn(String s) {
        log.warn(s);
    }

}
```

- 在构造方法中，我们可以看到，根据不同的情况，创建 `log` 为 Slf4jLocationAwareLoggerImpl 或 Slf4jLoggerImpl 对象。那么，这两个类的区别是什么呢？答案在代码的注释上。因为 `slf4j` 有 `1.6` 的版本差异，所以要做这样的处理。😈 一般情况下，我们不会使用到 `1.6` 这么老的版本，所以可以忽略 Slf4jLocationAwareLoggerImpl 类。
- 在方法中，调用 `log` 对应的方法。也就是说，Slf4jImpl 是对 `log` 的代理。那么，为什么要这么做呢？因为，Slf4jImpl 需要做 `1.6` 的版本兼容。

### 3.2.1 Slf4jLoggerImpl

`org.apache.ibatis.logging.slf4j.Slf4jLoggerImpl` ，实现 Log 接口，`slf4j` **(< 1.6)** 实现类。代码如下：

```java
// Slf4jLoggerImpl.java

public class Slf4jLoggerImpl implements Log {

    /**
     * SLF4J Logger 对象
     */
    private Logger log;

    public Slf4jLoggerImpl(Logger logger) {
        log = logger;
    }

    @Override
    public boolean isDebugEnabled() {
        return log.isDebugEnabled();
    }

    @Override
    public boolean isTraceEnabled() {
        return log.isTraceEnabled();
    }

    @Override
    public void error(String s, Throwable e) {
        log.error(s, e);
    }

    @Override
    public void error(String s) {
        log.error(s);
    }

    @Override
    public void debug(String s) {
        log.debug(s);
    }

    @Override
    public void trace(String s) {
        log.trace(s);
    }

    @Override
    public void warn(String s) {
        log.warn(s);
    }

}
```

- 在方法中，调用 `log` 对应的方法。也就是说，Slf4jLoggerImpl 是对 `log` 的代理。那么，为什么要这么做呢？因为，Slf4jLoggerImpl 需要做 `1.6` 的版本兼容。

### 3.2.2 Slf4jLocationAwareLoggerImpl

`org.apache.ibatis.logging.slf4j.Slf4jLocationAwareLoggerImpl` ，实现 Log 接口，`slf4j` **(>= 1.6)** 实现类。代码如下：

```java
// Slf4jLocationAwareLoggerImpl.java

public class Slf4jLocationAwareLoggerImpl implements Log {

    /**
     * SLF4J LocationAwareLogger 对象
     */
    private static final Marker MARKER = MarkerFactory.getMarker(LogFactory.MARKER);

    /**
     * LocationAwareLogger 对象
     */
    private static final String FQCN = Slf4jImpl.class.getName();

    /**
     * LocationAwareLogger 对象
     */
    private LocationAwareLogger logger;

    public Slf4jLocationAwareLoggerImpl(LocationAwareLogger logger) {
        this.logger = logger;
    }

    @Override
    public boolean isDebugEnabled() {
        return logger.isDebugEnabled();
    }

    @Override
    public boolean isTraceEnabled() {
        return logger.isTraceEnabled();
    }

    @Override
    public void error(String s, Throwable e) {
        logger.log(MARKER, FQCN, LocationAwareLogger.ERROR_INT, s, null, e);
    }

    @Override
    public void error(String s) {
        logger.log(MARKER, FQCN, LocationAwareLogger.ERROR_INT, s, null, null);
    }

    @Override
    public void debug(String s) {
        logger.log(MARKER, FQCN, LocationAwareLogger.DEBUG_INT, s, null, null);
    }

    @Override
    public void trace(String s) {
        logger.log(MARKER, FQCN, LocationAwareLogger.TRACE_INT, s, null, null);
    }

    @Override
    public void warn(String s) {
        logger.log(MARKER, FQCN, LocationAwareLogger.WARN_INT, s, null, null);
    }

}
```

- 在方法中，调用 `logger` 对应的方法。也就是说，Slf4jLocationAwareLoggerImpl 是对 `logger` 的代理。那么，为什么要这么做呢？因为，Slf4jLocationAwareLoggerImpl 需要做 `1.6` 的版本兼容。

# 4. 日志打印

在 MyBatis 中，日志的打印，主要使用 `BaseJdbcLogger`、`ConnectionLogger`、`StatementLogger`、`PreparedStatementLogger`、`ResultSetLogger` 等等。但是，实际上，我们会发现，在 `logging` 包下，还有 `jdbc` 包。😈 所以，本文暂时不分享这块内容，放在后面，我们看具体代码的时候，详细解析。

# 5. 异常处理

在 `logging` 包下，还有 `LogException` 异常类，被 `LogFactory` 所使用。代码如下：

```java
// LogException.java

public class LogException extends RuntimeException {

    private static final long serialVersionUID = 1022924004852350942L;

    public LogException() {
        super();
    }

    public LogException(String message) {
        super(message);
    }

    public LogException(String message, Throwable cause) {
        super(message, cause);
    }

    public LogException(Throwable cause) {
        super(cause);
    }

}
```

# 6. 总结

😈 日志模块，比较简单，所以内容不多。