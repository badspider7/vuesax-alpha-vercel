import { computed, getCurrentInstance, ref, shallowRef } from 'vue'
import { useVModel } from '@vueuse/core'
import { useInputEvent } from './use-input-event'
import { useInputClearable } from './use-input-clearable'
import type { InputProps } from '../input'

export const useInput = (props: InputProps) => {
  const { emit } = getCurrentInstance()!

  const model = useVModel(props, 'modelValue', emit)

  const hovering = ref(false)
  const inputRef = shallowRef<HTMLInputElement>()

  const isVisiblePassword = ref(false)

  const {
    blur,
    handleBlur,

    handleInput,
    handleChange,

    focused,
    focus,
    handleFocus,

    select,
    handleKeydown,
  } = useInputEvent({ inputRef })

  const { clear, showClear } = useInputClearable(props, { hovering, focused })

  const handleMouseLeave = (evt: MouseEvent) => {
    hovering.value = false
    emit('mouseleave', evt)
  }
  const handleMouseEnter = (evt: MouseEvent) => {
    hovering.value = true
    emit('mouseenter', evt)
  }

  const inputType = computed(() => {
    if (props.showPassword) {
      if (!isVisiblePassword.value) return 'password'
      return 'text'
    }
    return props.type
  })

  const clickIcon = (evs: any) => {
    focus()
    emit('clickIcon', evs)
  }

  const isShowPassword = computed(
    () =>
      props.showPassword &&
      !props.disabled &&
      !props.loading &&
      String(props.modelValue)
  )
  const handleShowPassword = () => {
    if (props.disabled || props.loading) return
    isVisiblePassword.value = !isVisiblePassword.value
  }

  return {
    model,
    inputType,
    isVisiblePassword,
    inputRef,
    isShowPassword,
    focused,
    hovering,
    handleInput,
    focus,
    handleFocus,
    handleKeydown,
    blur,
    handleBlur,
    handleChange,
    select,
    clickIcon,
    handleShowPassword,

    handleMouseLeave,
    handleMouseEnter,
    // clearable
    clear,
    showClear,
  }
}