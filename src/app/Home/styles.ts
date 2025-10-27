import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#202020ff",
		paddingTop: 62,
	},

	logo: {
		width: 134,
		height: 34,
	},

	form: {
		width: "100%",
		paddingHorizontal: 16,
		gap: 7,
		marginTop: 42,
	},

	content: {
		flex: 1,
		width: "100%",
		backgroundColor: "#383838ff",
		borderTopRightRadius: 24,
		borderTopLeftRadius: 24,
		padding: 24,
		paddingTop: 32,
		marginTop: 24,
	},

	header: {
		width: "100%",
		flexDirection: "row",
		gap: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#c1c1c1",
		paddingBottom: 12,
	},

	clearButton: {
		marginLeft: "auto",
	},

	clearText: {
		fontSize: 12,
		color: "#c1c1c1",
		fontWeight: 600,
	},

	separator: {
		width: "100%",
		height: 1,
		backgroundColor: "#c1c1c1",
		marginTop: 16,
	},

	listContent: {
		paddingTop: 24,
		paddingBottom: 62,
	},

	empty: {
		fontSize: 14,
		color: "#c1c1c1",
		textAlign: "center",
	},
});
