# last update: 05.07.2024
# ox_lib Redesign by mur4i
A few changes redesign for overextened context menu, font changes, theme and colors.
Download the release if you want to use.


Added new features:
- Add new Context menu description
- Add new Background convar (ox.cfg)
```setr ox:menuBackground false #true forces background on every context menu from ox_lib```
- Add new Background color option

Example of use:
```lua
            lib.registerContext({
                id = 'test',
                title = 'title from menu',
                ---------------------------------- NEW OPTIONS BELOW
                description = 'description from menu', --new line description on menu
                background = true, --TOGGLE background for only this menu (you can change default to setr ox:menuBackground true)
                backgroundColor = '#ffffff', --change the background color
                [...]
            }) 
```

Changes only on: //resource/interface/client/context.lua
```lua
        data = {
            title = data.title,
            description = data.description, --murai
            background = data.background or GetConvarInt('ox:menuBackground', 0) == 1, --murai
            backgroundColor = data.backgroundColor, --murai
            canClose = data.canClose,
            menu = data.menu,
            options = data.options
        }
```
Preview:
![](https://cdn.discordapp.com/attachments/1287111536581808138/1287132626687099013/image.png?ex=670b75eb&is=670a246b&hm=370a91b52508388ca89b6b5613a1e9bedbecd852be19ed68ca99433ddbedee0a&)
![](https://cdn.discordapp.com/attachments/1287111536581808138/1287131833498210414/image.png?ex=670b752e&is=670a23ae&hm=ebb3cdca17036ce6f9500c95727bcd2d56ecf87d0d71fd2d82fa02c9219f6812&)
![](https://cdn.discordapp.com/attachments/1287111536581808138/1287132676888727673/image.png?ex=670b75f7&is=670a2477&hm=b9f661a8938229908b2a11d7f6a473d02bf6d658fea4b7dc0aa80d3efea83aec&)
![](https://cdn.discordapp.com/attachments/1287111536581808138/1287132821156266046/image.png?ex=670b761a&is=670a249a&hm=cdbf8a5d405478f4deb9cba77fef4ad6adcab9ef78901c89e69b480aeb749e87&)
![](https://cdn.discordapp.com/attachments/1287111536581808138/1287132953167794216/image.png?ex=670b7639&is=670a24b9&hm=61a62dfeb5b7c86fb30d686d71e6305bc4243b1e1e8ba40d286eae9817d8e341&)
![](https://cdn.discordapp.com/attachments/1287111536581808138/1287133049200447610/image.png?ex=670b7650&is=670a24d0&hm=dd647164c7978935c91b526dce8bfede771caf6a4445f0ea92876a8ccb3d1058&)
![](https://cdn.discordapp.com/attachments/1287111536581808138/1287133098714202165/image.png?ex=670b765c&is=670a24dc&hm=8edaf72afede15146496d91077d3ac88c3dcf09f0a399fed77fd51788c23cf62&)

## Credits to overextended:
A FiveM library and resource implementing reusable modules, methods, and UI elements.

![](https://img.shields.io/github/downloads/overextended/ox_lib/total?logo=github)
![](https://img.shields.io/github/downloads/overextended/ox_lib/latest/total?logo=github)
![](https://img.shields.io/github/contributors/overextended/ox_lib?logo=github)
![](https://img.shields.io/github/v/release/overextended/ox_lib?logo=github) 

## 📚 Documentation

https://overextended.dev/ox_lib

## 💾 Download

https://github.com/overextended/ox_lib/releases/latest/download/ox_lib.zip

## npm Package

https://www.npmjs.com/package/@overextended/ox_lib

## Lua Language Server

- Install [Lua Language Server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) to ease development with annotations, type checking, diagnostics, and more.
- Install [cfxlua-vscode](https://marketplace.visualstudio.com/items?itemName=overextended.cfxlua-vscode) to add natives and cfxlua runtime declarations to LLS.
- You can load ox_lib into your global development environment by modifying workspace/user settings "Lua.workspace.library" with the resource path.
  - e.g. "c:/fxserver/resources/ox_lib"
