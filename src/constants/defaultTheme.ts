import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light'? '#333138' : '#f3f2f2',
    },
    secondary: {
      main: '#ff312e',
      light: '#ff7370',
      dark: '#8f0200'
    },
    info: {
      main: '#6295ac',
      light: '#7bb0c9',
      dark: '#477a91'
    },
    ...(mode === 'light'
        ? {
          schema: {
            free: '#E4E4E4',
            user: '#3f1ee2',
            notFree: '#FFB4AD'
          },
          background: {
            disabled: '#f3f2f2',
            drawer: '#fff',
            default: 'rgba(255, 255, 255, 1)',
            paper: 'rgba(255, 255, 255, 1)',
            app: 'rgba(236, 236, 236, 1)',
            mainMenuSearch: 'rgba(232,229,229,0.99)',
            menuSearch: 'rgba(255, 255, 255, 0.85)',
            loading: 'hsla(0,0%,100%,.7)',
            titleInfo: 'rgba(255, 255, 255, 0.1)',
            icon: 'rgba(255, 255, 255, 0.06)',
            btnText: 'rgba(236, 236, 236, 1)',
            skills: 'rgba(255, 255, 255, 0.5)',
            tableHeader: 'rgba(255, 255, 255, 1)',
            sectors: 'rgba(255, 255, 255, 0.91)',
            hoursSummary: '#FFFFFF',
            menuActive: '#1abc9c',
            menuNotActive: '#34495e',
            skill: '#E7E7E9',
            skillField: '#ffffff',
            textField: '#D7D7D7',
            schemaItemTitle: 'rgba(255, 255, 255, 0.17)',
            uploadBox: '#E7E7E9'// '#efefef'
          },
          border: {
            schemaItem: '1px solid #333138'
          },
          boxShadow: {
            default: '0px 0px 10px rgba(0, 0, 0, 0.05), inset -1px -2px 15px #FFFFFF',
            paper: '0px 0px 5px rgba(0, 0, 0, 0.05), inset -1px -2px 15px #FFFFFF',
            titleInfo: '0px 0px 4px rgba(0, 0, 0, 0.05)',
            skills: '0px 0px 5px 0px rgba(0, 0, 0, 0.05), -1px -2px 15px 0px #FFF inset',
            sectors: '0px 0px 10px rgba(0, 0, 0, 0.05), inset -1px -2px 10px #FFFFFF',
            hoursSummary: '0px 0px 0.650761px rgba(0, 0, 0, 0.25)',
            schemaItem:'0px 0px 4.88294px rgba(0, 0, 0, 0.05), inset -0.976589px -1.95318px 14.6488px #FFFFFF',
            schemaItemTitle: '0px 0px 5px rgba(0, 0, 0, 0.06), inset -1px -2px 5px #FFFFFF'
          },
          color: {
            up: '#fff',
            disabled: '#4a4747',
            default: '#5E5E5E',
            red: '#EB140A',
            lightRed: '#ff7370',
            normal: '#000000',
            icon: '#7A7A7A',
            text: '#000000',
          }
        }
        : {
          schema: {
            free: '#515151',
            user: '#7A8EFF',
            notFree: 'rgba(217, 51, 51, 0.4)'
          },
          background: {
            disabled: '#4b4b4b',
            app: 'rgba(36, 34, 34, 0.85)',
            drawer: '#000',
            default: 'rgba(64, 64, 64)',
            paper: 'rgba(35, 33, 33)',
            mainMenuSearch: '#4e4b4b',
            loading: 'hsla(0,0%,40%,.7)',
          },
          border: {
            schemaItem: '1px solid #b8b4b4'
          },
          color: {
            up: 'rgba(35, 33, 33)',
            disabled: '#fdfcfc',
            default:'#5E5E5E',
            red:'#EB140A',
            lightRed: '#ff7370',
            normal: '#F9F9F9',
            icon: '#7A7A7A',
            text:'#000000',
          }
        }
    ),

    typography: {
      fontFamily: ['A1Sans-Regular', 'Verdana', 'Arial', 'sans-serif'].join(','),
      letterSpacing: 0,
      fontDisplay: 'swap',
      htmlFontSize: 21,
      shadows: {
        0: 'none',
        1: '0px 2px 11px #E4E4E4',
        2: '0px 2px 11px #E4E4E4',
        3: '0px 2px 11px #E4E4E4',
        4: '0px 2px 11px #E4E4E4',
        5: '0px 2px 11px #E4E4E4',
        6: '0px 2px 11px #E4E4E4',
        7: '0px 2px 11px #E4E4E4',
        8: '0px 2px 11px #E4E4E4'
      }
    },

    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 250
          }
        }
      }
    }
  }
});
