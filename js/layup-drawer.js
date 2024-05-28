'use strict';

function LayupDrawer() {
    /**
     * Canvas element
     */
    this.canvas = null;
    this.imageDir = 'images/';
    this.images = {};
}

LayupDrawer.prototype = {
    /**
     * Configure the canvas
     *
     * @param {HTMLCanvasElement} canvas  Canvas element
     */
    init: function (canvas) {
        this.canvas = canvas;
        const ctx = this.canvas.getContext('2d');

        // Load and draw the image
        let image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = this.imageDir + 'paralel-grain-0.jpg';

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 180 }, (_, i) => i),
                datasets: [{
                    label: 't1: 42.5mm MGP10',
                    data: Array.from({ length: 180 }, () => 180),
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                }, {
                    label: 't2: 45mm MGP6',
                    data: Array.from({ length: 180 }, () => 135),
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                }, {
                    label: 't3: 45mm MGP6',
                    data: Array.from({ length: 180 }, () => 90),
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                }, {
                    label: 't4: 45mm MGP6',
                    data: Array.from({ length: 180 }, () => 45),
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                }, {
                    label: 't5: 42.5mm MGP10',
                    data: Array.from({ length: 180 }, () => 0),
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Primary Direction'
                        },
                        ticks: {
                            callback: function (value) {
                                return value % 30 === 0 ? value : '';
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Slab Thickness (mm)'
                        },
                        ticks: {
                            callback: function (value) {
                                return value % 60 === 0 ? value : '';
                            }
                        }
                    }
                }
            }
        });

        this.loadImages();
    },

    loadImages: function () {
        const imagesToLoad = ['MGP10', 'MGP6', 'MGP5'];
        let loadedCount = 0;

        imagesToLoad.forEach((grade) => {
            const image = new Image();
            image.onload = () => {
                loadedCount++;
                if (loadedCount === imagesToLoad.length) {
                    // this.drawLayup(cltLayup);
                }
            };
            image.src = this.imageDir + 'paralel-grain-0' + grade + '.jpg';
            this.images[grade] = image;
        });
    },

    /**
     * Draw a layup configuration on the canvas
     *
     * @param {Object} layup Layup object structure
     */
    drawLayup: function (layup) {
        const ctx = this.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let key in layup) {
            let config = layup[key];
            let image = this.images[config.grade];

            ctx.save();
            ctx.translate(250, 400);
            ctx.rotate(config.angle * Math.PI / 180);
            ctx.drawImage(image, -config.thickness / 2, -image.height / 2, config.thickness, image.height);
            ctx.restore();
        }
    },
};
