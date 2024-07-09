-- CreateTable
CREATE TABLE "follow" (
    "follower_id" INTEGER NOT NULL,
    "followee_id" INTEGER NOT NULL,
    "following_since" TIMESTAMP(6),

    CONSTRAINT "follow_pkey" PRIMARY KEY ("follower_id","followee_id")
);

-- CreateTable
CREATE TABLE "interaction" (
    "interaction_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,
    "interaction_type" VARCHAR(50),
    "created_date" TIMESTAMP(6),

    CONSTRAINT "interaction_pkey" PRIMARY KEY ("interaction_id")
);

-- CreateTable
CREATE TABLE "playlist" (
    "playlist_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "privacy_setting" VARCHAR(50),
    "creation_date" DATE,

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("playlist_id")
);

-- CreateTable
CREATE TABLE "playlist_song" (
    "playlist_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "playlist_song_pkey" PRIMARY KEY ("playlist_id","song_id")
);

-- CreateTable
CREATE TABLE "song" (
    "song_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "album" VARCHAR(255),
    "duration" INTEGER,
    "genre" VARCHAR(100),
    "release_date" DATE,
    "audio_file" VARCHAR(255),

    CONSTRAINT "song_pkey" PRIMARY KEY ("song_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "subscription_type" VARCHAR(50),
    "profile_picture" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followee_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "interaction" ADD CONSTRAINT "interaction_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "song"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "interaction" ADD CONSTRAINT "interaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist_song" ADD CONSTRAINT "playlist_song_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("playlist_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist_song" ADD CONSTRAINT "playlist_song_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "song"("song_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

