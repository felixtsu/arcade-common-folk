namespace effect {



    export function randomBeamFrom(sprite:Sprite, width:number, color:number = 1, beams:number = 10, timespan:number=2000) {

        let canvas = image.create(160, 120)
        let camera = game.currentScene().camera
        let centerX = sprite.x - camera.offsetX
        let centerY = sprite.y - camera.offsetY

        canvas.fillCircle(centerX, centerY, 4, color)

        let renderable = scene.createRenderable(sprite.z - 1, (target:Image, camera:scene.Camera) => {
            screen.drawTransparentImage(canvas, 0,0)
        })

        let counter = 0
        let intervalHandler = setInterval(()=>{
            randomLineToEdge(canvas, centerX, centerY, width, 1)
            counter++
            if (counter >= beams) {
                clearTimeout(intervalHandler)
                renderable.destroy()
            }
        }, timespan / beams)

    }

    function randomLineToEdge(target:Image, fromX:number, fromY:number, width:number, color:number) {
        let x = 0, y = 0
        let sector = randint(0,3)

        if (sector < 2) {
            // N/S
            x = randint(0, 160)
            if (sector == 0)  {
                y = screen.height
            }

            for (let i = - width / 2; i < width /2 ; i++) {
                target.drawLine(fromX+i, fromY, x+i, y, color)
            }

        } else {
            y = randint(0, 120)
            if (sector == 3) {
                x = screen.width
            }

            for (let i = - width / 2; i < width / 2; i++) {
                target.drawLine(fromX, fromY + i, x, y + i, color)
            }
        }

    }

}