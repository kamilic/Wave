Wave
----
Wave是一个能够帮助你快速创建一个波浪效果的插件。

####快速使用
```html
    <canvas width="300" height="300" id="wave"></canvas>
```

```javaScript
    Wave.animateAll();
    var w = Wave.createWave(settings);
    w.animate(); //enjoy!
```

####自定义
```html
    <canvas width="300" height="300" id="coolboy"></canvas>
```

```javaScript
    var settings = {
            id : "coolboy",
            waves:[{color: 'rgb(20,0,255)'},{color: 'rgb(20,10,255)'},{color: 'rgb(20,30,255)'}],
            alpha: 0.2,
            threshold: 30,
            amp: 30,
            freq: 1 / 150,
            yOffset: 20,
            moveStep: 1/20
        }
        Wave.animateAll();
        var w = Wave.createWave(settings);
        w.animate();
```


API
---
#### Wave
#####Wave.createWave(setting)
创建一个W实例。
#####Wave.animateAll()
开启全局动画。
#####Wave.stopAllAnimation()
与animateAll相反，关闭全局动画。
  
#### W
它是每个你所创建的波浪动画的实例。它将会被Wave注册入动画列表中进行每帧的渲染。同时你也可以在W暴露的一些方法来操控动画的进程。  
你可以创建多个W来控制多个指定canvas中的波浪动画。

##### W.animate()
开始执行该W实例所控制的canvas中的波浪动画。  
*重复执行这个将会被静默无视掉。
##### W.stopAnimation()
停止该W实例所控制的canvas中的波浪动画。    
##### W.percentage(per,time)
将波浪整体高度移动至canvas宽度的百比分。  
*该功能可以用于制作进度条等效果。
`per` 是百分比，可以输入0-100的整数。
`time` 是动画运行时间，可以输入任何整数，但是小于0会被忽略。

Settings
--------
创建W实例所需的一个对象,其所有值包括：
```json
{
    id : "coolboy", //String
    // id 必须输入，用于获得canvasElement的值，假如canvasElement不存在，会抛出一个错误。
    // 默认值是 "wave"，因此你可以选择在html上创建一个canvas#wave来使用默认的id。
    canvasElement : Node, 
    // canvas的DOM对象，原则上不需要输入该值，运行时会用getElementById(setting.id)来获得该对象。
    waves:[{color: 'rgb(20,0,255)'},{color: 'rgb(20,10,255)'},{color: 'rgb(20,30,255)'}], //Array 
    // 波浪对象，看快速使用的代码运行结果可以知道，动画效果是有多层波浪重叠而成的，
    // 这个参数就是定义每一层的波浪参数，目前只支持输入颜色这一键值。
    alpha: 0.2, //Number
    // 波浪对象的全局透明度值，建议设到0.5以下，否则多层波浪堆叠时，没有一定的透明度会显得没有立体感。
    threshold: 30, //Number
    // threshold 暂时无需输入，只是一个还在实现的功能的参数。
    amp: 30, //Number
    // amp 波函数的幅值函数中的一个参数，在动画中表示波浪的最大高度与最小高度。（基于canvas的中部)
    freq: 1 / 150, //Number
    // freq 波函数的频率，建议设置成宽度的倒数。
    yOffset: 20,  //Number
    // yOffset 波函数的初始高度（基于canvas的中部)。 
    moveStep: 1/20,//Number
    // moveStep 每一帧波函数移动的相位，在动画中反映波浪移动的速度。
    isRandom : true //Boolean
    
}       
```

另
---
利用这个效果可以配合CSS3的clip-path可以做出各种各样不一样的进度条。  
对于一些不支持CSS3而支持canvas的浏览器可以画一个canvas的mask来实现clip-path的效果。

后续优化
----
1.对于settings里面的参数，给予更多的调整度。
2.实现交互效果。
