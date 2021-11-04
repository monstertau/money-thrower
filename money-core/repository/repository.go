package repository

type Repositories struct {
	UserRepo        UserRepoInterface
	RedisRepo       RedisRepositoryInterface
	WalletRepo      WalletRepoInterface
	TransactionRepo TransactionRepoInterface
}
