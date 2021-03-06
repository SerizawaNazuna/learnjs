const schema = {
    "title": "新規にゲームを追加",
    "description": "https://docs.google.com/spreadsheets/d/1PrTVdLoHf5sdJJpQidhMd2fvpATN9P7PeCb6bkFuEeo/edit#gid=0",
    "type": "object",
    "required": [],
    "properties": {
        "name": {
            "type": "string",
            "title": "ゲーム名"
        },
        "playNumMin": {
            "type": "integer",
            "title": "人数(最低)"
        },
        "playNumMax": {
            "type": "integer",
            "title": "人数(最大)"
        },
        "url": {
            "type": "string",
            "title": "参考URL"
        },
        "owner": {
            "type": "string",
            "title": "保有者"
        },
        "place": {
            "type": "string",
            "title": "保管場所"
        }
    }
}

export default schema;