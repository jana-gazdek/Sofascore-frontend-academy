"use client";

import { useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr'; 
import { fetcher } from '../../utils/fetcher'; 
import Link from 'next/link'; 
import TeamCard from '../../components/TeamCard'; 
import PlayerCard from '../../components/PlayerCard'; 
import { Team, Player } from '../../model/entities';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); 

  const teamSearchUrl = query ? `/api/search/team/${encodeURIComponent(query)}` : null;
  const playerSearchUrl = query ? `/api/search/player/${encodeURIComponent(query)}` : null;

  const { data: teams, error: teamsError, isLoading: teamsLoading } = useSWR<Team[]>(
    teamSearchUrl,
    fetcher
  );

  const { data: players, error: playersError, isLoading: playersLoading } = useSWR<Player[]>(
    playerSearchUrl,
    fetcher
  );

  if (!query) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Search</h1>
        <p>Please enter a search term in the header to find teams or players.</p>
      </div>
    );
  }

  if (teamsLoading || playersLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Search Results for "{query}"</h1>
        <div>Loading search results...</div>
      </div>
    );
  }

  if (teamsError || playersError) {
    console.error("Search Page Error - Teams:", teamsError);
    console.error("Search Page Error - Players:", playersError);
    return (
      <div style={{ padding: '20px' }}>
        <h1>Search Results for "{query}"</h1>
        <div>Error loading search results. Please try again.</div>
      </div>
    );
  }

  const hasTeams = Array.isArray(teams) && teams.length > 0;
  const hasPlayers = Array.isArray(players) && players.length > 0;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Results for "{query}"</h1>

      <section>
        <h2>Teams</h2>
        {hasTeams ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {teams.map((team) => (
              <li key={team.id} style={{ marginBottom: '10px' }}>
                <Link href={`/team/${team.id}`}>
                  <TeamCard teamOrPlayer={team} type="team" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No teams found matching "{query}".</p>
        )}
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Players</h2>
        {hasPlayers ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {players.map((player) => (
              <li key={player.id} style={{ marginBottom: '10px' }}>
                <Link href={`/player/${player.id}`}>
                  <PlayerCard teamOrPlayer={player} type="player" /> 
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No players found matching "{query}".</p>
        )}
      </section>
    </div>
  );
}