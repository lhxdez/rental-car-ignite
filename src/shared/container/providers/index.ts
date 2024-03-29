import { container } from 'tsyringe'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk],
)
