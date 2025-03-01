# Example GitHub Action

A simple demonstration GitHub Action

```yaml
name: Example GitHub Action
steps:
  - uses: actions/checkout@v2
  - uses: example@v1
    with:
      message: Hello, World!
      environment: production
      debug: false
```

## Inputs

| Name | Description | Default |
| ---- | ----------- | ------- |
| message | The message to display | Hello, World! |
| environment | The environment to run in | production |
| debug | Enable debug mode | false |

## Outputs

| Name | Description |
| ---- | ----------- |
| status | The status of the action |
| timestamp | The time when the action completed |
