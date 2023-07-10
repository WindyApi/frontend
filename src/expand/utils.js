//新建Cookie
export function setCookie(name, value, expires) {
    document.cookie = `${name}=${value};expires=${expires}`
}

//根据name查找Cookie
export function getCookie(name) {
    let cookies = document.cookie.split(';')
    for (let index in cookies) {
        if (cookies[index].trim().split('=')[0] === `${name}`) {
            return cookies[index].trim().split('=')[1]
        }
    }
}

//时间转换
export function tsToDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

export function dateToTimestamp(date) {
    let timestamp = (new Date(date)).getTime()
    if (isNaN(timestamp)) {
        return 0
    } else {
        return timestamp
    }
}

//拷贝对象
export function copyObject(object) {
    return JSON.parse(JSON.stringify(object))
}

export function formatJSON(obj) {
    obj = JSON.stringify(obj)
    let indent = 4; // 设置缩进的空格数
    let formattedString = "";
    let level = 0; // 记录当前层级的缩进空格数

    for (let i = 0; i < JSON.stringify(obj).length; i++) {
        let char = obj.charAt(i);

        if (char === "{") {
            formattedString += "{\n" + " ".repeat(indent * level);
            level++;
        } else if (char === "}") {
            level--;
            formattedString += "\n" + " ".repeat(indent * level) + "}";
        } else if (char === ",") {
            formattedString += ",\n" + " ".repeat(indent * level);
        } else {
            formattedString += char;
        }
    }
    formattedString = formattedString.replaceAll("\\\"", "\"").replace("\"{", "{").replace("}\"", "}")
    return formattedString.replace("\"", "    \"");
}

function indent(level) {
    return "  ".repeat(level);
}


/**
 * 代码上色
 */
export function prismCode() {
    const script = document.createElement('script');
    script.src = "/prism/prism.js";
    document.body.appendChild(script);
    document.body.removeChild(script)
}

// 比较两个对象是否相等
export function isEqual(objA, objB) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key of keysA) {
        if (objA[key] !== objB[key]) {
            return false;
        }
    }

    return true;
}