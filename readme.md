# NestJS Logger Span

A winston based logger library that adds the spanId field throughout the application flow.

## Install

```
npm install winston nestjs-logger-span
```

## How to use

In the main.ts file in the create method add the bufferLogs property.

```
const app = await NestFactory.create(AppModule, { bufferLogs: true });
```

Also in the main.ts file add useLogger.

```
import { LoggerServiceCustom } from 'nestjs-logger-span';

app.useLogger(app.get(LoggerServiceCustom));
```

The main.ts file should look similar to the one below.

```
import { NestFactory } from '@nestjs/core';
import { LoggerServiceCustom } from 'nestjs-logger-span';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(LoggerServiceCustom));
  await app.listen(3000);
}
bootstrap();
```

In the app.module.ts file should be imported the nestjs-logger-span module and also added the middleware to identify the entire application flow in an http request.

```
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule, SpanMiddleware } from 'nestjs-logger-span';
import { transports, format, createLogger } from 'winston';

const configureLogger = () => {
  const consoleFormat = format.combine(format.timestamp(), format.json());
  return createLogger({
    level: process.env.DEBUG ? 'debug' : 'info',
    transports: [new transports.Console({ format: consoleFormat })],
  });
};

@Module({
  imports: [LoggerModule.forRoot(configureLogger())]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SpanMiddleware).forRoutes('*');
  }
}
```

With this library you can customize [winston](https://github.com/winstonjs/winston) settings as you wish.

But there are situations where you want to track a flow of your application that does not start on an http request, so for this purpose the decorator @Span was created.

```
import { Span } from 'nestjs-logger-span';

@Injectable()
export class SavedMediaListener {
  private readonly logger = new Logger(SavedMediaListener.name);

  constructor(@Inject(MEDIA_SERVICE) private readonly mediaService: MediaService) {}

  @Span
  listener(message: string, fields: MessageFields, properties: MessageProperties) {
    this.logger.log(`listener - Message [${message}]`);
    this.mediaService.read(message);
  }
}
```