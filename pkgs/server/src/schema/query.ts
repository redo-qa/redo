import { queryType } from "nexus"

export const Query = queryType({
    definition(t) {
        t.crud.tag()
        t.crud.selector()
        t.crud.step()
        t.crud.test()
        t.crud.user()
    }
})
