import { Feather } from "@expo/vector-icons";
import { CircleDashed } from "lucide-react-native";
import { FilterStatus } from "@/app/types/FilterStatus";

export function StatusIcon({ status }: { status: FilterStatus }) {
	return status === FilterStatus.DONE ? (
		<Feather name="check-circle" size={18} color="#2c46b1" />
	) : (
		<CircleDashed size={18} color="#1b1b1bff" />
	);
}
