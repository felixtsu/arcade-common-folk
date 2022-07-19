namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create()
    export const Monster = SpriteKind.create()
    export const MonsterTrigger = SpriteKind.create()
}

namespace monster {

    import i18nstr = i18n.i18nstr;
    const WIZARD_SPRITE_IMAGE = assets.image`wizard`
    const WIZARD_DOWN_SPRITE_IMAGE = assets.image`wizardDown`

    const TRIGGER_MONSTER_TARGET = "TRIGGER_MONSTER_TARGET"
    const MONSTER_TYPE = "MONSTER_TYPE"
    const WIZARD = "WIZARD"
    const COUNTERED_BY_PLAYER = "COUNTERED_BY_PLAYER"

    const FROM_MONSTER = "FROM_MONSTER"

    const WIZARD_ATTACK_INTERVAL = 2000

    let _init = false

    export function currentMonsters() :Sprite []{
        return sprites.allOfKind(SpriteKind.Monster)
    }

    function createMonster(image:Image, location:tiles.Location, triggerLocations:tiles.Location[]) :Sprite {
        let createdMonster = room.currentRoom().createSprite(image, SpriteKind.Monster)
        tiles.placeOnTile(createdMonster, location)

        let triggerSprites:Sprite[] = []

        triggerLocations.forEach(triggerLocation => {
            let triggerSprite = room.currentRoom().createSprite(img`
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        `, SpriteKind.MonsterTrigger)
            triggerSprite.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(triggerSprite, triggerLocation)
            sprites.setDataSprite(triggerSprite, TRIGGER_MONSTER_TARGET, createdMonster)

            triggerSprites.push(triggerSprite)
        })

        createdMonster.onDestroyed(() => {
            triggerSprites.forEach((s) => s.destroy())
        })


        if (!_init) {

            sprites.onOverlap(SpriteKind.Player, SpriteKind.MonsterTrigger, (player: Sprite, trigger: Sprite) => {
                let triggerTarget = sprites.readDataSprite(trigger, TRIGGER_MONSTER_TARGET)
                let monsterType = sprites.readDataString(triggerTarget, MONSTER_TYPE)

                // destroy all triggers of the same trigger target
                sprites.allOfKind(SpriteKind.MonsterTrigger).forEach(triggerSprite=>{
                    if (sprites.readDataSprite(triggerSprite, TRIGGER_MONSTER_TARGET) == triggerTarget) {
                        triggerSprite.destroy()
                    }
                })

                if (WIZARD == monsterType) {
                    wizardEncounter(player, triggerTarget)
                }
            })
            game.addScenePushHandler(() => {
                _init = false
            })
            _init = true
        }

        return createdMonster;
    }





    export function createWizard(location:tiles.Location, triggerLocations:tiles.Location[]) :Sprite {
        if (triggerLocations == undefined) {
            triggerLocations = [location]
        }

        let ret = createMonster(WIZARD_SPRITE_IMAGE, location, triggerLocations)
        sprites.setDataString(ret, MONSTER_TYPE, WIZARD)

       return ret;
    }

    let _wizardAttackInit = false

    function wizardEncounter(player:Sprite, wizard:Sprite) {
        if (!state.soulBound) {
            firstEncounter(player, wizard)
            return ;
        }

        let wizardHpBar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        wizardHpBar.attachToSprite(wizard)
        wizardHpBar.max = 100

        let attackInterval = setInterval(()=>{
            if (spriteutils.isDestroyed(wizard)) {
                clearInterval(attackInterval)
                return
            }
            wizard.sayText("sudilawa.kan", 500)
            let attackSprite = room.currentRoom().createSprite(assets.image`wizardMeteoroid`, SpriteKind.EnemyProjectile)
            makeSpriteAboveOf(attackSprite, heroSprite)
            sprites.setDataSprite(attackSprite, FROM_MONSTER, wizard)
            meteoroid.launchMeteoroidToPosition(attackSprite, player.x, player.y, 32, 2000, 16)

            wizard.onDestroyed(()=>{
                clearInterval(attackInterval)
                sprites.allOfKind(SpriteKind.EnemyProjectile).forEach(sprite=>{
                    let monster = sprites.readDataSprite(sprite, FROM_MONSTER)
                    if(monster == wizard) {
                        sprite.destroy()
                    }
                })
                })
        }, WIZARD_ATTACK_INTERVAL)

        if (!_wizardAttackInit) {
            sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, (player:Sprite, enemyProjectile:Sprite)=> {
                if (sprites.readDataBoolean(enemyProjectile, COUNTERED_BY_PLAYER)) {
                    // 如果已经反弹过了，就不用管了
                    return
                }

                controller.moveSprite(player, 0, 0)

                enemyProjectile.vx = 0
                enemyProjectile.vy = 0

                info.startCountdown(1)
                info.onCountdownEnd(() => {
                })
                let ret = false
                pauseUntil(() => {
                    ret = controller.A.isPressed()
                    return ret
                }, 1000)
                info.stopCountdown()
                if (!ret) {
                    scene.cameraShake(4, 500)
                    info.changeLifeBy(-1)
                    enemyProjectile.destroy()
                } else {
                    // 成功格挡以后，这里应该让陨石飞向敌人
                    let projectileLaunchingEnemy = sprites.readDataSprite(enemyProjectile, FROM_MONSTER)
                    enemyProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
                    meteoroid.redirectTo(enemyProjectile, projectileLaunchingEnemy.x, projectileLaunchingEnemy.y, 2000)
                    sprites.setDataBoolean(enemyProjectile, COUNTERED_BY_PLAYER, true)
                }
                controller.moveSprite(player)
            })

            sprites.onOverlap(SpriteKind.Monster, SpriteKind.EnemyProjectile, (monster:Sprite, enemyProjectile:Sprite) => {
                let counterByPlayer = sprites.readDataBoolean(enemyProjectile, COUNTERED_BY_PLAYER)
                if (counterByPlayer) {
                    enemyProjectile.destroy()
                    let monsterHpbar = statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, monster)
                    monsterHpbar.value -= 34
                    if (monsterHpbar.value <=0) {
                        story.startCutscene(()=>{
                            story.spriteSayText(monster, i18n.i18nstr`魔王大人...`)
                            monster.destroy()
                            story.printText("+1 exp", monster.x, monster.y)
                            state.exp += 1
                            story.cancelAllCutscenes()
                        })
                    }
                }
            })

            _wizardAttackInit = true
        }


    }

    function makeSpriteAboveOf(sprite:Sprite, otherSprite:Sprite) {
        sprite.z = otherSprite.z + 1
    }

    function firstEncounter(player:Sprite, wizard:Sprite) {
        story.startCutscene(() => {
            controller.moveSprite(player, 0, 0)

            story.spriteSayText(wizard, i18n.i18nstr`手无寸铁的小子`)
            story.spriteSayText(wizard, i18n.i18nstr`去死吧`)
            story.spriteSayText(wizard, "suli.wada")
            story.spriteSayText(wizard, "vodowofu.walala")
            story.spriteSayText(wizard, "kan!!!")

            let attackSprite = room.currentRoom().createSprite(assets.image`wizardMeteoroid`, SpriteKind.EnemyProjectile)
            attackSprite.x = player.x
            attackSprite.y = player.y - 48
            makeSpriteAboveOf(attackSprite, heroSprite)

            let shaderSprite = shader.createImageShaderSprite(assets.image`wizardMeteoroid`, shader.ShadeLevel.One)
            shaderSprite.x = player.x
            shaderSprite.y = player.y

            attackSprite.onDestroyed(()=>{
                shaderSprite.destroy()
            })

            if (!state.willingToBind) {
                story.spriteMoveToLocation(attackSprite, player.x, player.y, 32)

                story.spriteSayText(player, i18n.i18nstr`啊...`)
                story.printCharacterText(i18n.i18nstr`谁让你那时候说不愿意`, "???")
                story.printCharacterText(i18n.i18nstr`你有能力对抗魔王吗`, "???")
                story.printCharacterText(i18n.i18nstr`不自量力的家伙`, "???")
                story.printCharacterText(i18n.i18nstr`只能等待下一个天选之人了`, "???")
                pause(2000)
                game.reset()
            } else {

                story.spriteMoveToLocation(attackSprite, player.x, player.y - 32, 32)

                story.printCharacterText(i18n.i18nstr`邪恶法师召唤的火球从天而降`)
                story.spriteMoveToLocation(attackSprite, player.x, player.y - 24, 8)
                story.printCharacterText(state.playerName + i18n.i18nstr`无法动弹`)

                story.spriteMoveToLocation(attackSprite, player.x, player.y - 16, 8)

                story.printCharacterText(i18n.i18nstr`完了...`, state.playerName)

                multilights.toggleLighting(true)
                story.printCharacterText(i18n.i18nstr`就在` + state.playerName + "即将失去意识之际")
                story.printCharacterText(i18n.i18nstr`包里的锈剑闪出光芒`)

                effect.randomBeamFrom(player, 4, 1, 20, 5000)
                pause(5000)

                story.printCharacterText(i18n.i18nstr`时候到了...`, "???")
                story.printCharacterText(i18n.i18nstr`和我建立连接吧...`, "???")

                state.soulBound = true

                music.powerUp.playUntilDone()

                multilights.toggleLighting(false)

                story.printCharacterText(i18n.i18nstr`到了生死关头`, "???")
                story.printCharacterText(i18n.i18nstr`按A就可以使用我的力量`, "???")
                story.printCharacterText(i18n.i18nstr`试一下吧`, "???")

                info.onCountdownEnd(()=>{
                })
                info.startCountdown(1)

                let ret = false
                while(!ret) {
                    pauseUntil(() => {
                        ret = controller.A.isPressed()
                        return ret
                    }, 1000)
                    if(!ret) {
                        music.bigCrash.playUntilDone()
                        story.printCharacterText("这届勇者好难带", "???")
                        story.printCharacterText("不是说了按A吗？", "???")
                        story.printCharacterText("按啊!!!", "???")
                        story.printCharacterText("按了你就无敌了", "???")
                        info.startCountdown(1)
                    }
                }
                info.stopCountdown()

                story.spriteMoveToLocation(attackSprite, wizard.x, wizard.y, 16)

                story.spriteSayText(wizard, i18n.i18nstr`不可能...`)
                attackSprite.destroy()
                story.spriteSayText(wizard, i18n.i18nstr`要告诉...`)
                wizard.setImage(WIZARD_DOWN_SPRITE_IMAGE)
                story.spriteSayText(wizard, i18n.i18nstr`魔王大人...`)


                story.printCharacterText(i18n.i18nstr`呼呼呼...`, state.playerName)
                story.printCharacterText(i18n.i18nstr`真够危险的...`, state.playerName)
                story.printCharacterText(i18n.i18nstr`刚才是?`, state.playerName)
                music.knock.playUntilDone()
                player.setImage(assets.image`playerDown`)

                for (let i = 0; i < 5; i++) {
                    multilights.toggleLighting(true)
                    pause(500)
                    if (i == 2) {
                        wizard.destroy()
                    }
                    if (i == 4) {
                        let oldmanSprite = room.currentRoom().createSprite(img`
                            . . . . f f f f f . . .
                            . . f f e e e e e f . .
                            . f f e e e e e e e f .
                            f f f f e e e e e e e f
                            f f f f f e e e 4 e e f
                            f f f f e e e 4 4 e e f
                            f f f f 4 4 4 4 4 e f f
                            f f 4 e 4 f f 4 4 e f f
                            . f 4 d 4 d d d d f f .
                            . f f f 4 d d b b f . .
                            . . f e e 4 4 4 e f . .
                            . . 4 d d e 1 1 1 f . .
                            . . e d d e 1 1 1 f . .
                            . . f e e f 6 6 6 f . .
                            . . . f f f f f f . . .
                            . . . . f f f . . . . .
                        `)
                        tiles.placeOnTile(oldmanSprite, tiles.getTileLocation(3,4))
                    }
                    multilights.toggleLighting(false)
                    pause(500)

                }

                story.printCharacterText(state.playerName+"，你怎么倒在这里了...","???")
                multilights.toggleLighting(true)
                story.printCharacterText("村长将" + state.playerName + "带回了家")

                room.currentRoom().leaveRoom(house.ROOM_NAME)
            }
        })
    }

}
