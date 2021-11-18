package service

type Services struct {
	AuthService        AuthServiceInterface
	JWTService         JWTServiceInterface
	PasswordService    PasswordServiceInterface
	MailService        MailServiceInterface
	WalletService      WalletServiceInterface
	TransactionService TransactionServiceInterface
	CategoryService CategoryServiceInterface

}
