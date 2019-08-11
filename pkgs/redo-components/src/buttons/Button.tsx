import React, { FC } from "react"
import MuiButton, {
    ButtonProps as MuiButtonProps
} from "@material-ui/core/Button"
import { makeKinds, KindFrom } from "../common"
import { Row } from "../layouts"
import { useTheme } from "../styles"

const useKind = makeKinds<MuiButtonProps>()({
    primary: {
        color: "primary",
        variant: "contained"
    },
    secondary: {
        variant: "outlined",
        style: {
            color: "black"
        }
    }
})

export type ButtonProps = MuiButtonProps & {
    kind?: KindFrom<typeof useKind>
}

export const Button: FC<ButtonProps> = ({
    kind = "primary",
    style,
    ...rest
}) => {
    console.log(useTheme())
    const { style: kindStyle, ...kindRest } = useKind(kind)
    return (
        <MuiButton
            fullWidth={false}
            style={{
                minWidth: 80,
                textTransform: "none",
                ...(kindStyle ? kindStyle : {}),
                ...(style ? style : {})
            }}
            {...kindRest}
            {...rest}
        />
    )
}
