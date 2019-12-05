import React from "react"
import { Column, Card, Row, Text, Icons, IconButton } from "@re-do/components"
import { NexusGenAllTypes } from "@re-do/model"
import { ValueFrom } from "@re-do/utils"

class Other {
    name: string
    description: string
}

type SuggestionKinds = {
    test: NexusGenAllTypes["Test"]
    other: Other
}

type SuggestionKind = keyof SuggestionKinds

export type SuggestionCardProps<T extends SuggestionKind> = {
    kind: T
    value: ValueFrom<SuggestionKinds, T>
}

export const getSuggestionExtras = (): SuggestionExtras => {
    return {
        test: [<IconButton Icon={Icons.run} onClick={() => {}} />],
        other: []
    }
}

type SuggestionExtras = { [K in SuggestionKind]: JSX.Element[] }

export const SuggestionCard = <T extends SuggestionKind>({
    kind,
    value
}: SuggestionCardProps<T>) => {
    const extras = getSuggestionExtras()
    return (
        <Card
            style={{
                height: 160,
                width: 160
            }}
        >
            <Column full={true} justify="space-around">
                <Row full={true} justify="center" align="center">
                    <Text variant="h6" noWrap align="center">
                        {name}
                    </Text>
                </Row>
                <Row full={true} justify="center" align="center">
                    <Text variant="body2" align="center">
                        {kind === "test" ? value : "Test"}
                    </Text>
                </Row>
                <Row full={true} justify="center" align="center">
                    {extras}
                </Row>
            </Column>
        </Card>
    )
}