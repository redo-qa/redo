import type { BrowserName } from "@re-do/run"
import type { Step, Tag, Element, Test } from "@re-do/model"
import type { ShallowModel } from "persist-statelessly"

export type RedoData = {
    tests: Test[]
    elements: Element[]
    steps: Step[]
    tags: Tag[]
}

export type Page = "HOME" | "SIGN_IN" | "SIGN_UP"

export type UnsavedStep = Step & { id: number }

export type Root = {
    page: Page
    token: string
    cardFilter: string
    defaultBrowser: BrowserName
    builder: {
        active: boolean
        steps: UnsavedStep[]
    }
    main: MainActions
    renderer: RendererActions
    data: ShallowModel<RedoData, "id">
}

export type MainActions = {
    runTest: [number] | null
    saveTest: [Test] | null
    launchBuilder: [] | null
    closeBuilder: [] | null
}

export type RendererActions = {}
