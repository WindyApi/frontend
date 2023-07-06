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

export function formatJSON(jsonString) {
    let indentLevel = 0;
    let result = "";

    for (let i = 0; i < jsonString.length; i++) {
        let char = jsonString[i];

        if (char === '{' || char === '[') {
            result += char + "\n" + indent(++indentLevel);
        } else if (char === '}' || char === ']') {
            result += "\n" + indent(--indentLevel) + char;
        } else if (char === ',') {
            result += char + "\n" + indent(indentLevel);
        } else {
            result += char;
        }
    }

    return result;
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