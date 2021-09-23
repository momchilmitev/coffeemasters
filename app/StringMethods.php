<?php
declare(strict_types=1);
namespace Framework;

class StringMethods
{
    private static $delimiter = '#';

    public function __construct()
    {
        // Do nothing
    }

    public function __clone()
    {
        // Do nothing
    }

    private static function normalize($pattern)
    {
        return self::$delimiter . trim($pattern, self::$delimiter) . self::$delimiter;
    }

    public static function getDelimiter(): string
    {
        return self::$delimiter;
    }

    public static function setDelimiter(string $delimiter)
    {
        self::$delimiter = $delimiter;
    }

    public static function match(string $string, string $pattern): int|false|null
    {
        preg_match_all(self::normalize($pattern), $string, $matches, PREG_PATTERN_ORDER);
        if (!empty($matches[1])) {
            return $matches[1];
        }
        if (!empty($matches[0])) {
            return $matches[0];
        }

        return null;
    }

    public static function split($string, $pattern, $limit = null)
    {
        $flags = PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE;
        return preg_split(self::normalize($pattern), $string, $limit, $flags);
    }
}
