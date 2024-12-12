-- CreateTable
CREATE TABLE "communites" (
    "id" STRING NOT NULL,
    "ownerId" STRING NOT NULL,
    "name" STRING,
    "icon" STRING NOT NULL DEFAULT 'https://icon-library.com/images/lion-595b40b75ba036ed117d858a.svg.svg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "crdb_region" "crdb_internal_region",

    CONSTRAINT "communites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "username" STRING,
    "password" STRING NOT NULL,
    "email" STRING NOT NULL,
    "avatar" STRING NOT NULL DEFAULT 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "crdb_region" "crdb_internal_region",

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "communites" ADD CONSTRAINT "communites_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
