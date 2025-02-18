
使用swc，他是rust（多线程，没有GC），比babel快
使用babel的话，v8是让源码从解释器（字节码）到编译器（机器码）
反复调用的是热代码，会让字节码变成机器码（如果js能直接调用机器码，那性能就是最牛逼的，恰好swc就干这个事）

具体去看.swcrc.md

tsconfig.json是提示路径
webpack还要在module平级的resolve去加编译路径
