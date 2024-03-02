const rootStdio = "[blocks][stdio]";

/**
 * Variables - Char block 
 */
Blockly.Blocks.library_stdio_text_char = {
    init: function () {
        console.log(`${rootStdio} library_stdio_text_char`);
        this.setHelpUrl(Blockly.Msg.TEXT_CHAR);
        this.setColour(90);
        this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "CHAR").appendField(this.newQuote_(!1));
        this.setOutput(!0, ["VAR_CHAR", "CHAR"]);
        this.setTooltip(Blockly.Msg.TEXT_CHAR_TOOLTIP)
    },
    newQuote_: function (a) {
        return new Blockly.FieldImage(a == this.RTL ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAACXBIWXMAAAsTAAALEwEAmpwYAAABt0lEQVRIibXUsWsUQRiG8eeLMYlnpRIVlIgQESySIoUonCBqpaJFCgURwULwT7CwsEglWNhbCVZaWAUObCystBCUgIgWQa4ydhIVHovsyeXYWTNzlxeWhfmG3367szOwTYlUQT0AHAMmgN/VtQp0I+JP9pPUGfWp6XTV++pMDnqmAazL4lbQuUy0l8tN6JT6shD+os6m4HYh2suTQXOsup/c2ioks6AeroPXh4TngIU6eBS5qY5vB9wCdg7CP0YAHwX2DsJvRwCv03dEjAFExEdgaUh4EnATXOUh0BkCXmPjoNoMR8QacAm4VQi3gB3/vLoZagtoA+eAI9Xwr+p+IwG/By5GxGpRW+rdxLZeUQ/15mX9x9UGaCfKn4DvRTCwGziYqHUi4memtxH1RMMJN98/N7fjq4nxZeBzabez6rdEt+dL0Qn1WQJ9rk6WwtcSaFc9XopeaFiwO6Xo2Qa07BOoiw3oa3VfLthSlxrQN2pqkyTR0+qHkaHqtPqoAVTtqHty0Ov/AVUfmLlQ48B8Q/0rcDsiXuWgvY73q+9qunyc9eoJ/EofuKKeGgrsg6fUF+o9ddcozL8mXx4vauBlKQAAAABJRU5ErkJggg==" :
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAkCAYAAABixKGjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrElEQVRIia3WMWsUQRyG8WcOYmw8kQjRBIIgCBoQLYJgEZA02qopRbCxEMRvYBWEpBHyCdKIjZA+GCwCMRYBG40gaHVqwIAoaPdY3AbP3M5udmZfWFjY2d/MDvPfGciMekJdVpfUTq43CF9Xv/ovV9pAJ9RnDmdNPZYD3y5BB3MvBe2qKzVwT73WFJ5UN2vgx+rxpvBZ9W0FuqVON0IL+Jy6UwE/UI+kwFM1I55tjBZw1/6yKktPvZgEF/iTCvhyDny1YirmcuCuuh6BF5LhAr8bgbfVUznwmPFCaV7SB/AbEfijOpVidgq4A9yKtHkH7CbjwDhwKdJmI4TwJwcHGIm0eZ8CAwQAdQZ4E2nzBXhZ3O//R3aAdWCr9qvU2YrCqUpPvWlk78zdUE8DL4Dn6tG28f3MA3di+B7wLbODR+pkGf69BfwCcKYM7wCjmThA6ch/AJ9awMeH8BDCL2C1BfznEF7kFfnz/t/7g/hn4HUm3os+UWcSK1X7p7HqulHvJ8CH/+erDxvCzU5c6nl1sQZ+qp6MGeEQnYwCE/TX8Ehx/QY+hBD2Go24zfwFdQY82azgsTIAAAAASUVORK5CYII=",
            6, 12, '"')
    },
    onchange: function (a) {
        a = this.getFieldValue("CHAR");
        null != a && 1 < a.length ? a.startsWith("\\") ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.TEXT_CHAR_WARNING) : this.setWarningText(null)
    }
};
