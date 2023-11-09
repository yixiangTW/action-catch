export type EventType = {
  selector: string;
  keyPrefix: string;
  eventName: string;
  cb?: (e: any) => object
}

export type RemoveEventListener = () => void;

export type CreateListenerType = (events: EventType[]) => RemoveEventListener[]

export type CreateType = (arg: EventType) => RemoveEventListener[]

export type StartListenType = () => RemoveEventListener[]

export type ListenerType = (
  event: Event,
  cb: ((e: any) => object) | undefined,
  keyPrefix: string,
  eventName?: string,
) => void

export type SupportListenersType = {
  [key: string]: ListenerType
}
