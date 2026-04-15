import { reactive } from 'vue';

const state = reactive({
  visible: false,
  text: '',
  color: 'success',
});

export const useSnackbar = () => {
  const showSnackbar = (text, color = 'info') => {
    state.text = text;
    state.color = color;
    state.visible = true;
  };

  return { snackbarState: state, showSnackbar };
};
