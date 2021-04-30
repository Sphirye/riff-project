
import Torrent from "@/models/Torrent"
import Vue from "vue"
import ConstantTool from "./tools/ConstantTool"
import JsonTool from "./tools/JsonTool"

export default class CoindeskService {
    
    static async getTorrents(component: Vue, torrents: Torrent[]) {

        //@ts-ignore
        component.loading = true

        try {
            const response = await component.axios.get(`https://u.riff.cc/api/torrents`,{
                params: {
                    api_token: ConstantTool.RIFF_API_TOKEN
                }
            })
            let convertedResponse = JsonTool.jsonConvert.deserializeArray(response.data.data, Torrent)
            console.log(response.data)
            torrents.splice(0, torrents.length)
            convertedResponse.forEach(t => torrents.push(t))

            //@ts-ignore
            component.loading = false
        } catch (err) {
            //@ts-ignore
            component.loading = false
            console.log(err)
        }
    }

    static async getTorrent(component: Vue, id: number) {
        try {
            const response = await component.axios.get(`https://u.riff.cc/api/torrents/${id}/?api_token=${ConstantTool.RIFF_API_TOKEN}`)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    static async getTorrentPage(component: Vue, page: number, torrents: Torrent[]) {

        //@ts-ignore
        component.loading = true

        try {
            const response = await component.axios.get(`https://u.riff.cc/api/torrents/`, {
                params: {
                    page: page,
                    api_token: ConstantTool.RIFF_API_TOKEN
                }
            })
    
            const convertedResponse = JsonTool.jsonConvert.deserializeArray(response.data.data, Torrent)
            if (page == 1) {
                torrents.splice(0, torrents.length)
            }

            convertedResponse.forEach(t => torrents.push(t))
            
            //@ts-ignore
            component.page = (component.page + 1)
            //@ts-ignore
            component.loading = false

        } catch(err) {
            //@ts-ignore
            component.loading = false
        }
    }
}