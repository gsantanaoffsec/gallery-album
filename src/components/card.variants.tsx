import {tv} from "tailwind-variants";

const cardVariants = tv({
	base: `
		rounded transition
	`,
	variants: {
		variant: {
			default: "border border-solid border-border-primary bg-transparent",
			primary: "bg-background-primary",
		},
		size: {
			none: "",
			md: "p-3",
			lg: "p-6",
		},
	},
	defaultVariants: {
		size: "none",
		variant: "default",
	},
});

export default cardVariants;