import {tv} from "tailwind-variants";

const iconVariants = tv({
	variants: {
		animate: {
			false: "",
			true: "animate-spin",
		},
	},
	defaultVariants: {
		animate: false,
	},
});

export default iconVariants;