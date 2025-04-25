import { defineStore } from 'pinia';
import { ref } from 'vue';

import { createClient } from '@supabase/supabase-js';
import type { User } from '../types/user';
import Profile from '../views/Profile.vue';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User>({
    id: '00000000-0000-0000-0000-000000000000', // Changed to UUID format
    username: Profile.telegramUser.username ,
    avatar: Profile.telegramUser.photo_url,
    level: 1,
    completedLevels: 0,
    friendCode: 'abc123',
    achievements: []
  });

  const friends = ref<User[]>([]);
  const leaderboardData = ref([]);

  const fetchLeaderboard = async () => {
    const { error } = await supabase
      .from('leaderboard')
      .select(`
        *,
        users (username, avatar, level)
      `)
      .order('rank', { ascending: true });

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return;
    }

    //leaderboardData.value = data;
  };

  const updateProgress = async () => {
    // Validate that we have a valid UUID before making the request
    if (!currentUser.value.id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentUser.value.id)) {
      console.error('Invalid user ID format');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({
        completed_levels: currentUser.value.completedLevels + 1,
        level: currentUser.value.level
      })
      .eq('id', currentUser.value.id); // Now using UUID

    if (error) {
      console.error('Error updating progress:', error);
      return;
    }

    // Update local state
    currentUser.value.completedLevels += 1;

    // Update leaderboard
    await supabase
      .from('leaderboard')
      .upsert({
        user_id: currentUser.value.id,
        score: currentUser.value.level * 100 + currentUser.value.completedLevels * 10,
        updated_at: new Date()
      });
  };

  // Subscribe to leaderboard changes
  supabase
    .channel('leaderboard_changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'leaderboard'
    }, () => {
      fetchLeaderboard();
    })
    .subscribe();

  return {
    currentUser,
    friends,
    leaderboardData,
    fetchLeaderboard,
    updateProgress
  };
});