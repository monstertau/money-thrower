package repository

type Repositories struct {
	UserRepo     UserRepoInterface
	RedisRepo    RedisRepositoryInterface
	WalletRepo   WalletRepoInterface
	CategoryRepo CategoryRepoInterface
	TransactionRepo TransactionRepoInterface
}
