Wave
----
Wave��һ���ܹ���������ٴ���һ������Ч���Ĳ����

####����ʹ��
```html
    <canvas width="300" height="300" id="wave"></canvas>
```

```javaScript
    Wave.animateAll();
    var w = Wave.createWave(settings);
    w.animate(); //enjoy!
```

####�Զ���
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
����һ��Wʵ����
#####Wave.animateAll()
����ȫ�ֶ�����
#####Wave.stopAllAnimation()
��animateAll�෴���ر�ȫ�ֶ�����
  
#### W
����ÿ�����������Ĳ��˶�����ʵ���������ᱻWaveע���붯���б��н���ÿ֡����Ⱦ��ͬʱ��Ҳ������W��¶��һЩ�������ٿض����Ľ��̡�  
����Դ������W�����ƶ��ָ��canvas�еĲ��˶�����

##### W.animate()
��ʼִ�и�Wʵ�������Ƶ�canvas�еĲ��˶�����  
*�ظ�ִ��������ᱻ��Ĭ���ӵ���
##### W.stopAnimation()
ֹͣ��Wʵ�������Ƶ�canvas�еĲ��˶�����    
##### W.percentage(per,time)
����������߶��ƶ���canvas��ȵİٱȷ֡�  
*�ù��ܿ�������������������Ч����
`per` �ǰٷֱȣ���������0-100��������
`time` �Ƕ�������ʱ�䣬���������κ�����������С��0�ᱻ���ԡ�

Settings
--------
����Wʵ�������һ������,������ֵ������
```json
{
    id : "coolboy", //String
    // id �������룬���ڻ��canvasElement��ֵ������canvasElement�����ڣ����׳�һ������
    // Ĭ��ֵ�� "wave"����������ѡ����html�ϴ���һ��canvas#wave��ʹ��Ĭ�ϵ�id��
    canvasElement : Node, 
    // canvas��DOM����ԭ���ϲ���Ҫ�����ֵ������ʱ����getElementById(setting.id)����øö���
    waves:[{color: 'rgb(20,0,255)'},{color: 'rgb(20,10,255)'},{color: 'rgb(20,30,255)'}], //Array 
    // ���˶��󣬿�����ʹ�õĴ������н������֪��������Ч�����ж�㲨���ص����ɵģ�
    // ����������Ƕ���ÿһ��Ĳ��˲�����Ŀǰֻ֧��������ɫ��һ��ֵ��
    alpha: 0.2, //Number
    // ���˶����ȫ��͸����ֵ�������赽0.5���£������㲨�˶ѵ�ʱ��û��һ����͸���Ȼ��Ե�û������С�
    threshold: 30, //Number
    // threshold ��ʱ�������룬ֻ��һ������ʵ�ֵĹ��ܵĲ�����
    amp: 30, //Number
    // amp �������ķ�ֵ�����е�һ���������ڶ����б�ʾ���˵����߶�����С�߶ȡ�������canvas���в�)
    freq: 1 / 150, //Number
    // freq ��������Ƶ�ʣ��������óɿ�ȵĵ�����
    yOffset: 20,  //Number
    // yOffset �������ĳ�ʼ�߶ȣ�����canvas���в�)�� 
    moveStep: 1/20,//Number
    // moveStep ÿһ֡�������ƶ�����λ���ڶ����з�ӳ�����ƶ����ٶȡ�
    isRandom : true //Boolean
    
}       
```

��
---
�������Ч���������CSS3��clip-path�����������ָ�����һ���Ľ�������  
����һЩ��֧��CSS3��֧��canvas����������Ի�һ��canvas��mask��ʵ��clip-path��Ч����

�����Ż�
----
1.����settings����Ĳ������������ĵ����ȡ�
2.ʵ�ֽ���Ч����
