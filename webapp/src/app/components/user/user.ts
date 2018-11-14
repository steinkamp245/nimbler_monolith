export interface User {
    name: string
    email: string
    eventConfig: EventConfig
}


export interface EventConfig {
    categories: string[]
    latestStartTime: number
}