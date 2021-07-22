import Noty from 'noty';
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/metroui.css";

export function simpleNoty(text, type) {
    new Noty({
        text: text,
        theme: "metroui",
        timeout: 2000,
        progressBar: true,
        type: type
    }).show();
}