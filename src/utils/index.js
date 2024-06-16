export function getBackgroundColor(types) {
    if (types === undefined) return 'rgba(88, 88, 88, 0.5)';
    if (types.includes('fire')) return 'rgba(229, 40, 41, 0.5)';
    if (types.includes('water')) return 'rgba(41, 128, 239, 0.5)';
    if (types.includes('grass')) return 'rgba(63, 161, 41, 0.5)';
    if (types.includes('poison')) return 'rgba(145, 65, 203, 0.5)';
    if (types.includes('bug')) return 'rgba(166, 185, 26, 0.5)';
    if (types.includes('fighting')) return 'rgba(255, 128, 0, 0.5)';
    if (types.includes('flying')) return 'rgba(129, 185, 239, 0.5)';
    if (types.includes('ground')) return 'rgba(145, 81, 33, 0.5)';
    if (types.includes('rock')) return 'rgba(176, 170, 131, 0.5)';
    if (types.includes('ghost')) return 'rgba(112, 65, 112, 0.5)';
    if (types.includes('electric')) return 'rgba(250, 192, 0, 0.5)';
    if (types.includes('psychic')) return 'rgba(239, 65, 121, 0.5)';
    if (types.includes('ice')) return 'rgba(61, 206, 243, 0.5)';
    if (types.includes('dragon')) return 'rgba(80, 96, 225, 0.5)';
    if (types.includes('steel')) return 'rgba(96, 161, 184, 0.5)';
    if (types.includes('dark')) return 'rgba(98, 77, 78, 0.5)';
    if (types.includes('fairy')) return 'rgba(239, 112, 239, 0.5)';
    if (types.includes('stellar')) return 'rgba(64, 181, 165, 0.5)';
    if (types.includes('normal')) return 'rgba(159, 161, 159, 0.5)';
  
    return 'rgba(104, 160, 144, 0.5)';
  }
  
  export function getPokemonColor(type) {
    switch (type) {
      case 'fire':
        return '#E52829';
      case 'water':
        return '#2980EF';
      case 'grass':
        return '#3FA129';
      case 'poison':
        return '#9141CB';
      case 'bug':
        return '#A6B91A';
      case 'fighting':
        return '#FF8000';
      case 'flying':
        return '#81B9EF';
      case 'ground':
        return '#915121';
      case 'rock':
        return '#B0AA83';
      case 'ghost':
        return '#704170';
      case 'electric':
        return '#FAC000';
      case 'psychic':
        return '#EF4179';
      case 'ice':
        return '#3DCEF3';
      case 'dragon':
        return '#5060E1';
      case 'steel':
        return '#60A1B8';
      case 'dark':
        return '#624D4E';
      case 'fairy':
        return '#EF70EF';
      case 'stellar':
        return '#40B5A5';
      case 'normal':
        return '#9FA19F';
      default:
        return '#68A090';
    }
  }
  