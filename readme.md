## react composable api
#### official page: [https://react-composable.com](https://react-composable.com]) 
#### github page: [https://react-composable.com](https://react-composable.com]) 
___

Lightweight library for creation composable functional components. 
This lib provide a classic hooks and life cycle actions of composable pattern:
---

```tsx
import {ref, watch, onMounted} from 'react-composable-api'

function App() {
    const state = ref('init')
    onMounted(() => {
        state.value = 'mounted'
    })
    watch(state.value, () => {
        console.log(`is changed value: ${state.value}`)
    })
    return <h1 onClick={() => state.value = 'changed'}>Actual value: {state.value}</h1>
}

export default App
```
---
work in progress for bested result!
