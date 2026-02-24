import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

type Agent = {
  id: string;
  name: string;
  specialization: string;
  status: "На завданні" | "Вільний" | "Відпустка";
};

const agents: Agent[] = [
  {
    id: "1",
    name: "Іванов Олексій",
    specialization: "Фізична охорона",
    status: "На завданні",
  },
  {
    id: "2",
    name: "Петренко Марія",
    specialization: "Відеоспостереження",
    status: "Вільний",
  },
  {
    id: "3",
    name: "Сидоренко Дмитро",
    specialization: "Пультова охорона",
    status: "На завданні",
  },
  {
    id: "4",
    name: "Коваленко Анна",
    specialization: "Консалтинг з безпеки",
    status: "Відпустка",
  },
  {
    id: "5",
    name: "Бондаренко Віктор",
    specialization: "Супровід вантажів",
    status: "Вільний",
  },
];

const statusColors: Record<Agent["status"], string> = {
  "На завданні": "#f59e0b",
  Вільний: "#22c55e",
  Відпустка: "#94a3b8",
};

export function AgentsList() {
  const renderAgent = ({ item }: { item: Agent }) => (
    <ThemedView style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>
            {item.name.charAt(0)}
          </ThemedText>
        </View>
        <View style={styles.info}>
          <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
          <ThemedText style={styles.specialization}>
            {item.specialization}
          </ThemedText>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[item.status] + "25" },
          ]}
        >
          <ThemedText
            style={[styles.statusText, { color: statusColors[item.status] }]}
          >
            {item.status}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.heading}>
        Наші агенти
      </ThemedText>
      <FlatList
        data={agents}
        keyExtractor={(item) => item.id}
        renderItem={renderAgent}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.2)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  specialization: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
