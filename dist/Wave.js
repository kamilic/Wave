/**
 * Created by x on 2016/4/14.
 */
window.addEventListener("load", function () {
    window.Wave = (function () {
        //== const ==
        var DEFAULT_ID = "circle",
            DEFAULT_WIDTH = "200",
            DEFAULT_HEIGHT = "200",
            DEFAULT_AMP = 10,
            DEFAULT_FREQUENCY = 1 / DEFAULT_WIDTH,
            DEFAULT_YOFFSET = 20,
            DEFAULT_MOVESTEP = DEFAULT_FREQUENCY * 20,
            ALPHA = 0.2,
            THRESHOLD = 10,
            WAVES = [
                {
                    color: 'rgb(20,0,255)'
                },
                {
                    color: 'rgb(20,10,255)'
                },
                {
                    color: 'rgb(20,30,255)'
                },
                {
                    color: 'rgb(20,70,255)'
                },
                {
                    color: 'rgb(20,90,255)'
                }
            ];
        // == const end ==

        // == animation methods ==
        var Move = (function () {

            /* all aniData
             *  {
             *      isCanvas : boolean, // required,
             *      context :  CanvasRenderingContext2D // if isCanvas = true, context is required.
             *      onClear : function,  // if isCanvas = true, required.
             *      onUpdate : function, // required
             *      onRender : function,  // required
             *      onFrameStart : function // optional
             *      onFrameEnd : function // optional
             *  }
             */

            /* @var loop global animation switch.
             * @var isAnimationRunning A notation to indicate whether animation is running now.
             */
            var loop = true,
                isAnimationRunning = false,
                animationQueue = [],
                isSupport = (typeof window.requestAnimationFrame === "function"),
                interval = 16;

            function AniObj(aniData) {
                "use strict";
                aniData = aniData || {};
                aniData.isCanvas = aniData.isCanvas || false;
                this.data = aniData;
                if (aniData.isCanvas) {
                    if (aniData.context instanceof CanvasRenderingContext2D) {
                        if (aniData.onClear) {
                            console.warn("Your onClear callback is " + aniData.onClear + ".\n" +
                                "Program will replace it with default clear function.\n" +
                                "If the effect of default function don't meet your expectation, please define your own onClear callback.");
                        }
                        this.data.onClear = onClear.bind(aniData.context);
                    } else {
                        throw Error("AniObj : the type of aniData isn't CanvasRenderingContext2D.");
                    }

                }
                if (!aniData.onUpdate) {
                    throw Error("AniObj : You should register callback onUpdate,otherwise animation can't be run.");
                }
                if (!aniData.onRender) {
                    throw Error("AniObj : You should register callback onRender,otherwise animation can't be run.");
                }
                //Object.freeze(this);
            }

            AniObj.prototype.animate = function () {
                if (animationQueue.indexOf(this) === -1) {
                    animationQueue.push(this);
                    this._over = false;
                }
            };
            AniObj.prototype.stopAnimation = function () {
                var index = animationQueue.indexOf(this);
                this._over = true;
            };


            function onClear(data) {
                var canvas = data.context.canvas;
                canvas.width = canvas.width;
            }

            function animate() {
                if (loop === true) {
                    var len = animationQueue.length;
                    for (var i = 0; i < len; i++) {
                        var aniObj = animationQueue.shift(),
                            data = aniObj.data;
                        if (aniObj._over) {
                            continue;
                        }
                        if (data.onFrameStart) data.onFrameStart.call(aniObj, data);
                        data.onUpdate.call(aniObj, data);
                        if (data.isCanvas) data.onClear.call(aniObj, data);
                        if (data.onRender) data.onRender.call(aniObj, data);
                        if (data.onFrameEnd) data.onFrameEnd.call(aniObj, data);
                        animationQueue.push(aniObj);
                    }
                    if (isSupport) {
                        requestAnimationFrame(animate);
                    } else {
                        setTimeout(animate, interval);
                    }
                }
            }

            function stopAnimation() {
                loop = false;
                isAnimationRunning = false;
            }

            function ani() {
                if (isAnimationRunning) {
                    console.log("animation is running..");
                } else {
                    loop = true;
                    isAnimationRunning = true;
                    animate();
                }
            }

            return {
                animateAll: ani,
                stopAllAnimation: stopAnimation,
                AniObj: AniObj
            };
        })();

        function update(data) {
            var shape = data.shapeObj,
                curves = shape.curves;
            curves.forEach(function (value) {
                value.move();
                value.amp.weaken();
            });
        }

        function draw(data) {
            var shape = data.shapeObj,
                context = shape.context,
                halfWidth = shape.width / 2,
                curves = shape.curves;

            curves.forEach(function (value) {
                context.save();
                context.translate(halfWidth, halfWidth);
                context.beginPath();
                context.moveTo(-halfWidth, value.getResult(-halfWidth));
                for (var xpos = 0; xpos <= halfWidth * 2; xpos++) {
                    context.lineTo(xpos - halfWidth, value.getResult(xpos));
                }
                context.lineTo(xpos - halfWidth, halfWidth);
                context.lineTo(-halfWidth, halfWidth);
                context.closePath();
                context.globalAlpha = shape.alpha;
                context.fillStyle = value.color;
                context.fill();
                context.restore();
            });
        }

        function percentage(per, height, curves, last) {
            if (per > 100 || per < 0) throw Error("InputError : Per must be 0 to 100 integer.");
            per = -per / 100 + 0.5;
            curves.forEach(function (value) {
                new Move.AniObj({
                    last: last || Math.abs((height * per - value.yOffset) / height * 2000),
                    ratio: 0,
                    timeCreate: Date.now(),
                    curve: value,
                    originalValue: value.yOffset,
                    moveLength: height * per - value.yOffset,
                    onUpdate: function (data) {
                        var timeNow = Date.now();
                        if ((data.timeCreate + data.last) < timeNow) {
                            this.stopAnimation();
                        } else {
                            data.ratio = (timeNow - data.timeCreate) / data.last;
                        }
                    },
                    onRender: function (data) {
                        data.curve.yOffset = data.originalValue + data.ratio * data.moveLength;
                    }
                }).animate();
            });
        }

        // == animation methods end ==
        function createWave(settings) {
            settings = settings || {};
            var defaultSettings = {
                waves: WAVES,
                alpha: ALPHA,
                threshold: THRESHOLD,
                width: DEFAULT_WIDTH,
                height: DEFAULT_HEIGHT,
                amp: DEFAULT_AMP,
                freq: DEFAULT_FREQUENCY,
                yOffset: DEFAULT_YOFFSET,
                moveStep: DEFAULT_MOVESTEP,
                isRandom: true
            };
            settings = util.extend(settings, defaultSettings);
            if (settings.canvasElement) {
                throw Error("the key 'settings.canvasElement' is not allow to be used.Please use another key to create.");
            }
            settings.canvasElement = document.getElementById(settings.id) || document.getElementById(DEFAULT_ID);
            if (settings.canvasElement && settings.canvasElement.getContext) {
                settings.width = settings.canvasElement.width || DEFAULT_WIDTH;
                settings.height = settings.canvasElement.height || DEFAULT_HEIGHT;
                return new W(settings);

            } else {
                throw Error("typeError : Can't get the canvasElement by settings.id.Please check your settings.id.");
            }
        }

        function W(settings) {
            var curves = [],
                waveAmpCurve = new AmpCurve(new Array(settings.width + 1), null, settings.height, settings.threshold),
                sineCurve = null;
            waveAmpCurve.sineCurve(settings.width * (settings.isRandom ? Math.random() : 1),
                settings.amp * (settings.isRandom ? Math.random() : 1),
                settings.freq * (settings.isRandom ? Math.random() : 1));
            for (var i = 0; i < settings.waves.length; i++) {
                sineCurve = new SineCurve(waveAmpCurve, settings.freq * (settings.isRandom ? Math.random() : 1),
                    settings.freq * (settings.isRandom ? Math.random() : 1),
                    settings.yOffset * (settings.isRandom ? Math.random() : 1),
                    settings.moveStep * (settings.isRandom ? Math.random() : 1));
                sineCurve.color = settings.waves[i].color;
                curves.push(sineCurve);
            }
            settings.curves = curves;
            settings.context = settings.canvasElement.getContext("2d");
            var ani = new Move.AniObj({
                shapeObj: settings,
                isCanvas: true,
                context: settings.context,
                onUpdate: update,
                onRender: draw

            });
            this.animate = ani.animate.bind(ani);
            this.stopAnimation = ani.stopAnimation.bind(ani);
            this.percentage = function (per, last) {
                return percentage(per, settings.height, curves, last);
            };
            waveAmpCurve.sineCurve(settings.width, settings.height / 10, 1 / (settings.width));
        }


        return {
            createWave: createWave, // factory,
            animateAll: Move.animateAll,
            stopAllAnimation: Move.stopAllAnimation
        };


    })
    ();
    // == util ==
    var util = {};
    util.extend = function (obj, defaultObj) {
        if (!obj) return defaultObj;
        for (var i in defaultObj) {
            if (defaultObj.hasOwnProperty(i)) {
                if (!obj.hasOwnProperty(i) || !obj[i] && typeof obj[i] !== "boolean") {
                    obj[i] = defaultObj[i];
                }
            }
        }
        return obj;
    };

    // == util end ==

    // == Curves Constructors ==
    function SineCurve(amp, freq, phase, yOffset, step) {
        this.amp = amp || 10;
        this.freq = freq || 0.2 * Math.PI;
        this.phase = phase || 0;
        this.yOffset = yOffset || 0;
        this.step = step || freq * 0.01;
    }

    SineCurve.prototype.getResult = function (x) {
        if (typeof x === 'number') {
            if (!(this.amp instanceof AmpCurve)) {
                return (this.amp * Math.sin(this.freq * x + this.phase)) + this.yOffset;
            }
            else {
                return (this.amp.value(x) * Math.sin(this.freq * x + this.phase)) + this.yOffset;
            }
        }
        else {
            throw new Error('x is undefined');
        }
    };
    SineCurve.prototype.move = function () {
        this.phase += this.step;
    };

    function AmpCurve(array, threshold, height) {
        this.height = height;
        this.threshold = threshold || 10;
        this.array = array;
        var len = this.array.length;
        for (var i = 0; i < len; i++) {
            array[i] = 0;
        }
    }

    AmpCurve.prototype.sineCurve = function (x, y, freq) {
        var arr = this.array,
            sine = new SineCurve(y, (freq), x, 0);
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                arr[i] = sine.getResult(parseInt(i));
            }
        }
    };
    AmpCurve.prototype.weaken = function () {
        var ratio = 0.999;
        var arr = this.array;
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                if (Math.abs(arr[i]) < this.threshold) {
                    return;
                }
                arr[i] *= ratio;
            }
        }
    };
    AmpCurve.prototype.addPoint = function (x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.array[x] = y;
        }
    };
    AmpCurve.prototype.value = function (x) {
        if (typeof x === 'number') {
            if (this.array[x] !== undefined) {
                return this.array[x];
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    };
    // == Curves Constructors end ==

    var settings = {
        isRandom : true,
        id : "coolboy",
        waves:[{color: 'rgb(20,0,255)'},{color: 'rgb(20,10,255)'}],
        alpha: 0.2,
        threshold: 40,
        amp: 20,
        freq: 1/ 300,
        yOffset: 0,
        moveStep: 1 / 10
    };
    Wave.animateAll();
    Wave.createWave(settings).animate();

});


