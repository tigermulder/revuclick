import { atom, selector } from "recoil"
import { TodoItemInterface } from "../types/interface"

// todoList - atom
export const todoListState = atom<TodoItemInterface[]>({
  key: "todoListState",
  default: []
})

// todoList filter - atom
export const todoListFilterState = atom<string>({
  key: "todoListFilterState",
  default: "Show All"
})

// todoList - selector
export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState)
    const list = get(todoListState)

    switch (filter) {
      case "show Completed":
        return list.filter((prevItem) => prevItem.isComplete)
      case "show Uncompleted":
        return list.filter((prevItem) => !prevItem.isComplete)
      default:
        return list
    }
  }
})

// todoList filter - selector
export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList: TodoItemInterface[] = get(todoListState)
    const totalNum: number = todoList.length
    const totalCompletedNum: number = todoList.filter(
      (item) => item.isComplete
    ).length
    const totalUnCompletedNum: number = totalNum - totalCompletedNum
    const percentCompleted: number =
      totalNum === 0 ? 0 : totalCompletedNum / totalNum

    return {
      totalNum,
      totalCompletedNum,
      totalUnCompletedNum,
      percentCompleted
    }
  }
})
