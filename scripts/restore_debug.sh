#!/usr/bin/env bash
######################################################################################
# Title:         Cloudbox Restore Service: Restore Script                            #
# Author(s):     l3uddz, desimaniac                                                  #
# URL:           https://github.com/Cloudbox/Cloudbox                                #
# Description:   Restores encrypted config files from Cloudbox Restore Service.      #
# --                                                                                 #
#             Part of the Cloudbox project: https://cloudbox.works                   #
######################################################################################
#                     GNU General Public License v3.0                                #
######################################################################################
# Usage:                                                                             #
# ======                                                                             #
# Simple:                                                                            #
# curl -s https://cloudbox.works/scripts/restore.sh | bash -s 'USER' 'PASS'          #
# wget -qO- https://cloudbox.works/scripts/restore.sh | bash -s 'USER' 'PASS'        #
#                                                                                    #
# Custom Cloudbox Path:                                                              #
# curl -s https://cloudbox.works/scripts/restore.sh | bash -s 'USER' 'PASS' 'PATH'   #
# wget -qO- https://cloudbox.works/scripts/restore.sh | bash -s 'USER' 'PASS' 'PATH' #
######################################################################################

# vars
files=( "ansible.cfg" "accounts.yml" "settings.yml" "adv_settings.yml" "backup_config.yml" "rclone.conf" )
restore="restore.cloudbox.works"
folder="$HOME/.restore_service_tmp"
green="\e[1;32m"
red="\e[1;31m"
nc="\e[0m"
done="[ ${green}DONE${nc} ]"
fail="[ ${red}FAIL${nc} ]"

# Print banner

echo -e "
$green┌─────────────────────────────────────────────────────────────────────┐
$green│ Title:         Cloudbox Restore Service: Restore Script             │
$green│ Author(s):     l3uddz, desimaniac                                   │
$green│ URL:           https://github.com/cloudbox/cloudbox                 │
$green│ Description:   Restores encrypted config files from the             │
$green│                Cloudbox Restore Service.                            │
$green├─────────────────────────────────────────────────────────────────────┤
$green│         Part of the Cloudbox project: https://cloudbox.works        │
$green├─────────────────────────────────────────────────────────────────────┤
$green│                  GNU General Public License v3.0                    │
$green└─────────────────────────────────────────────────────────────────────┘
$nc"


# inputs
USER=$1
echo $USER
PASS=$2
echo $PASS
DIR=${3:-$HOME/cloudbox}
echo $DIR

# validate inputs
if [ -z "$USER" ] || [ -z "$PASS" ]
then
      echo "You must provide the USER & PASS as arguments"
      exit 1
fi

# validate folders exist
TMP_FOLDER_RESULT=$(mkdir -p $folder)
if [ ! -z "$TMP_FOLDER_RESULT" ]
then
    echo "Failed to ensure $folder was created..."
    exit 1
else
   rm -rf $folder/*
fi


RESTORE_FOLDER_RESULT=$(mkdir -p $DIR)
if [ ! -z "$RESTORE_FOLDER_RESULT" ]
then
    echo "Failed to ensure $DIR was created..."
    exit 1
fi

# SHA1 username
USER_HASH=$(echo -n "$USER" | openssl dgst -sha1 | sed 's/^.*= //')
echo "User Hash: $USER_HASH"
echo ''

# Fetch files
echo "Fetching files from $restore..."
echo ''
for file in "${files[@]}"
do
        :
        # wget file
        printf '%-20.20s' "$file"
        echo wget -qO $folder/$file.enc http://$restore/load/$USER_HASH/$file
        wget -qO $folder/$file.enc http://$restore/load/$USER_HASH/$file
        echo head -c 10 $folder/$file.enc | tr -d '\0'
        head -c 10 $folder/$file.enc | tr -d '\0'
        file_header=$(head -c 10 $folder/$file.enc | tr -d '\0')
        # is the file encrypted?
        if [[ $file_header == Salted* ]]
        then
                echo -e $done
        else
                echo -e $fail
                exit 1
        fi
done

echo ''

# Decrypt files
echo 'Decrypting fetched files...'
echo ''
for file in "${files[@]}"
do
        :
        # wget file
        printf '%-20.20s' "$file"
        echo openssl enc -aes-256-cbc -d -salt -md md5 -in $folder/$file.enc -out $folder/$file -k "$PASS"
        openssl enc -aes-256-cbc -d -salt -md md5 -in $folder/$file.enc -out $folder/$file -k "$PASS"
        DECRYPT_RESULT=$?
        # was the file decryption successful?
        if [[ $DECRYPT_RESULT == 0 ]]
        then
                echo -e $done
        else
                echo -e $fail
                exit 1
        fi
done

echo ''

# Move decrypted files
echo 'Moving decrypted files...'
echo ''
for file in "${files[@]}"
do
        :
        # move file
        printf '%-20.20s' "$file"
        echo mv $folder/$file $DIR/$file
        mv $folder/$file $DIR/$file
        MOVE_RESULT=$?
        # was the decrypted file moved successfully?
        if [[ $MOVE_RESULT == 0 ]]
        then
                echo -e $done
        else
                echo -e $fail
                exit 1
        fi
done

echo ''

# finish
exit 0
