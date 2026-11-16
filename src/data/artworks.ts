import animeCyberGirlImg from '../assets/images/logo_anime_cyber_girl_1794757359036.jpg';
import animeKitsuneImg from '../assets/images/logo_anime_kitsune_1794757052060.jpg';
import animeMechaDragonImg from '../assets/images/logo_anime_mecha_dragon_1794757358542.jpg';
import animeWarriorImg from '../assets/images/logo_anime_warrior_1794757050873.jpg';
import cartoonLionImg from '../assets/images/logo_cartoon_lion_1794757053138.jpg';
import cartoonNinjaFoxImg from '../assets/images/logo_cartoon_ninja_fox_1794757359898.jpg';
import cartoonPandaImg from '../assets/images/logo_cartoon_panda_1794757052293.jpg';
import cartoonSpaceMonkeyImg from '../assets/images/logo_cartoon_space_monkey_1794757359052.jpg';
import celebCinemaKingImg from '../assets/images/logo_celeb_cinema_king_1794757360346.jpg';
import celebDjLegendImg from '../assets/images/logo_celeb_dj_legend_1794757361757.jpg';
import celebPopiconImg from '../assets/images/logo_celeb_popicon_1794757053404.jpg';
import celebRedcarpetImg from '../assets/images/logo_celeb_redcarpet_1794757052478.jpg';
import charArcaneMageImg from '../assets/images/char_arcane_mage_1794772324750.jpg';
import charCyberSamuraiImg from '../assets/images/char_cyber_samurai_1794772323834.jpg';
import charPirateCaptainImg from '../assets/images/char_pirate_captain_1794772325536.jpg';
import charRoyalKnightImg from '../assets/images/char_royal_knight_1794772325299.jpg';
import charShadowNinjaImg from '../assets/images/char_shadow_ninja_1794772325500.jpg';
import charSpaceRangerImg from '../assets/images/char_space_ranger_1794772325059.jpg';
import sportsBasketballImg from '../assets/images/logo_sports_basketball_1794757054599.jpg';
import sportsBoxingImg from '../assets/images/logo_sports_boxing_champion_1794757360661.jpg';
import sportsFootballImg from '../assets/images/logo_sports_football_1794757053935.jpg';
import sportsRacingImg from '../assets/images/logo_sports_racing_turbo_1794757361751.jpg';
import { ArtworkDef } from '../types/logo';

export const ARTWORKS: ArtworkDef[] = [
  {
    id: 'char-samurai',
    src: charCyberSamuraiImg,
    category: 'characters',
    bg1: '#0F172A',
    bg2: '#090D16',
    accent: '#F43F5E',
  },
  {
    id: 'char-mage',
    src: charArcaneMageImg,
    category: 'characters',
    bg1: '#2E1065',
    bg2: '#13072E',
    accent: '#FBBF24',
  },
  {
    id: 'char-astronaut',
    src: charSpaceRangerImg,
    category: 'characters',
    bg1: '#0B1120',
    bg2: '#020617',
    accent: '#FACC15',
  },
  {
    id: 'char-pirate',
    src: charPirateCaptainImg,
    category: 'characters',
    bg1: '#042F2E',
    bg2: '#0B132B',
    accent: '#F59E0B',
  },
  {
    id: 'char-knight',
    src: charRoyalKnightImg,
    category: 'characters',
    bg1: '#0F1E42',
    bg2: '#091126',
    accent: '#FBBF24',
  },
  {
    id: 'char-ninja',
    src: charShadowNinjaImg,
    category: 'characters',
    bg1: '#091518',
    bg2: '#050A0C',
    accent: '#34D399',
  },
  {
    id: 'anime-warrior',
    src: animeWarriorImg,
    category: 'anime',
    bg1: '#071324',
    bg2: '#0F172A',
    accent: '#22D3EE',
  },
  {
    id: 'anime-kitsune',
    src: animeKitsuneImg,
    category: 'anime',
    bg1: '#1A0B2E',
    bg2: '#090514',
    accent: '#F43F5E',
  },
  {
    id: 'anime-cybergirl',
    src: animeCyberGirlImg,
    category: 'anime',
    bg1: '#1E103C',
    bg2: '#0B061A',
    accent: '#E879F9',
  },
  {
    id: 'anime-dragon',
    src: animeMechaDragonImg,
    category: 'anime',
    bg1: '#041C1A',
    bg2: '#090D16',
    accent: '#34D399',
  },
  {
    id: 'cartoon-panda',
    src: cartoonPandaImg,
    category: 'cartoon',
    bg1: '#3B0764',
    bg2: '#1E1B4B',
    accent: '#FACC15',
  },
  {
    id: 'cartoon-lion',
    src: cartoonLionImg,
    category: 'cartoon',
    bg1: '#0F292E',
    bg2: '#091518',
    accent: '#FB923C',
  },
  {
    id: 'cartoon-monkey',
    src: cartoonSpaceMonkeyImg,
    category: 'cartoon',
    bg1: '#2E1065',
    bg2: '#1E1B4B',
    accent: '#FACC15',
  },
  {
    id: 'cartoon-fox',
    src: cartoonNinjaFoxImg,
    category: 'cartoon',
    bg1: '#0B132B',
    bg2: '#1C2541',
    accent: '#2DD4BF',
  },
  {
    id: 'celeb-redcarpet',
    src: celebRedcarpetImg,
    category: 'celebrities',
    bg1: '#181106',
    bg2: '#09090B',
    accent: '#FBBF24',
  },
  {
    id: 'celeb-popicon',
    src: celebPopiconImg,
    category: 'celebrities',
    bg1: '#2E083A',
    bg2: '#12051E',
    accent: '#E879F9',
  },
  {
    id: 'celeb-cinemaking',
    src: celebCinemaKingImg,
    category: 'celebrities',
    bg1: '#1A1308',
    bg2: '#09090B',
    accent: '#F59E0B',
  },
  {
    id: 'celeb-dj',
    src: celebDjLegendImg,
    category: 'celebrities',
    bg1: '#230939',
    bg2: '#0F071C',
    accent: '#FDE047',
  },
  {
    id: 'sports-football',
    src: sportsFootballImg,
    category: 'sports',
    bg1: '#042F2E',
    bg2: '#0F172A',
    accent: '#FACC15',
  },
  {
    id: 'sports-basketball',
    src: sportsBasketballImg,
    category: 'sports',
    bg1: '#2A0808',
    bg2: '#0F0F12',
    accent: '#F97316',
  },
  {
    id: 'sports-boxing',
    src: sportsBoxingImg,
    category: 'sports',
    bg1: '#1E1B24',
    bg2: '#09090B',
    accent: '#FBBF24',
  },
  {
    id: 'sports-racing',
    src: sportsRacingImg,
    category: 'sports',
    bg1: '#0B1120',
    bg2: '#020617',
    accent: '#22D3EE',
  },
  {
    id: 'sports-academy',
    src: '/assets/aistudio/image_a10f33dd.png',
    category: 'sports',
    bg1: '#071538',
    bg2: '#0B245B',
    accent: '#F5B731',
  },
];
