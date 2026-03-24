import { AddIslandScreen } from '@/components/AddIslandScreen';
import { useRouter } from 'expo-router';

export default function AddRoute() {
  const router = useRouter();
  
  return <AddIslandScreen onAdded={() => router.navigate('/(app)/(tabs)/islands')} />;
}
