import {
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
    Args,
    Arg
} from "type-graphql"
import { Test, TestInput, TestUpdate } from "@re-do/model"
import { resolver } from "./Resolver"
import { Context } from "../context"
import { createTagConnector } from "./common"

@Resolver(of => Test)
export class TestResolver extends resolver({
    inType: TestInput,
    outType: Test,
    upType: TestUpdate
}) {
    @Authorized()
    @Mutation(returns => Test)
    async createTest(
        @Args() { name, steps, tags }: TestInput,
        @Ctx() context: Context
    ) {
        const { photon, userId: id } = context
        const test = await photon.tests.create({
            data: {
                name,
                steps: {
                    create: steps.map(step => ({
                        ...step,
                        selector: {
                            create: {
                                css: step.selector.css,
                                user: { connect: { id } }
                            }
                        },
                        user: { connect: { id } }
                    }))
                },
                tags: await createTagConnector(tags, context),
                user: { connect: { id } }
            },
            include: { tags: true, steps: { include: { selector: true } } }
        })
        return test
    }

    // @Authorized()
    // @Mutation(returns => Test)
    // async updateTest(
    //     @Args() { name, steps, tags }: TestUpdate,
    //     @Arg("id") testId: string,
    //     @Ctx() context: Context
    // ) {
    //     const { photon, userId: id } = context
    //     const test = await photon.tests.update({
    //         data: {
    //             name,
    //             steps: steps
    //                 ? {
    //                       create: steps.map(step => ({
    //                           ...step,
    //                           selector: {
    //                               create: {
    //                                   css: step.selector.css,
    //                                   user: {
    //                                       connect: { id }
    //                                   }
    //                               }
    //                           },
    //                           user: { connect: { id } }
    //                       }))
    //                   }
    //                 : undefined,
    //             tags: tags ? await createTagConnector(tags, context) : undefined
    //         },
    //         where: { id: testId },
    //         include: { tags: true, steps: { include: { selector: true } } }
    //     })
    //     return test
    // }
}