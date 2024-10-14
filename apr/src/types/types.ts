export type ListItem = {
    id: string,
    title?: string, 
    description?: string, 
    checked?: boolean, 
    expanded?: boolean
}

export type Node<T> = {
    item: T; 
    children: Node<T>[]

}