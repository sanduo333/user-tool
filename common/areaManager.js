const KEY_CUR_AREA = "curArea"

export default {
    getAreaNames() {

    },
    getAreas() {
        return [
            {label: '中国大陆+86', value: '+86'},
            {label: '中国香港+852', value: '+852'},
        ];
    },
    setCurArea(area) {
        console.log('保存area: ', area)
        uni.setStorageSync(KEY_CUR_AREA, area)
    },
    getCurArea() {
        try {
            let area = uni.getStorageSync(KEY_CUR_AREA)
            if (area == null || area.length == 0) {
                area = this.getAreas()[0]
            }
            console.log('读取本地保存的area: ', area)
            return area
        } catch (e) {
            console.log(e)
            return this.getAreas()[0]
        }

    },
}
