// import Types from '../main/api/types';

declare module '*.vue' {
    import Vue, { VueConstructor } from 'vue';
    declare const component: VueConstructor<Vue>;
    export default component;
}

declare module 'muse-ui-toast' {
    import { Toast as IToast } from 'muse-ui-toast/types/index';
    declare const Toast: IToast;
    export default Toast;
}

declare module 'muse-ui-message' {
    import { Message as IMessage } from 'muse-ui-message/types/index';
    declare const Message: IMessage;
    export default Message;
}

declare module 'electron' {
    import { IpcMessageEvent } from 'electron';
    interface IpcRenderer {
        on(channel: string, listener: (event: IpcMessageEvent, ...args: any[]) => void): this;
    }
}
