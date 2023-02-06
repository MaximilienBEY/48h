import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material"

const Helper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement={props.placement ?? "top"}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.paper.darken,
    color: theme.palette.text.primary,
    fontSize: 11,
    marginBottom: "8px !important",
  },
}))

export default Helper
