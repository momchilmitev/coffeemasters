<?php

use Framework\Helpers\StringMethods;
use Framework\Core\Inspector;

class Base
{
    private $inspector;

    public function __construct($options = [])
    {
        $this->inspector = new Inspector($this);
        if (is_array($options) || is_object($options)) {
            foreach ($options as $key => $value) {
                $key = ucfirst($key);
                $method = "set{$key}";
                $this->$method($value);
            }
        }
    }

    public function __call($name, $arguments)
    {
        if (empty($this->inspector)) {
            throw new \Exception('Call parent::__construct!');
        }
        $getMatches = StringMethods::match($name, '^get([a-zA-Z0-9]+)$');
        if (sizeof($getMatches) > 0) {
            $normalized = lcfirst($getMatches[0]);
            $property = "{$normalized}";
            if (property_exists($this, $property)) {
                $meta = $this->inspector->getPropertyMeta($property);
                if (empty($meta['@readwrite']) && empty($meta['@read'])) {
                    throw new \Exception("{$property} is write-only");
                }
                if (isset($this->$property)) {
                    return $this->$property;
                }
                return null;
            }
        }
        $setMatches = StringMethods::match($name, '^set([a-zA-Z0-9]+)$');
        if (sizeof($setMatches) > 0) {
            $normalized = lcfirst($setMatches[0]);
            $property = "{$normalized}";
            if (property_exists($this, $property)) {
                $meta = $this->inspector->getPropertyMeta($property);
                if (empty($meta['@readwrite']) && empty($meta['@write'])) {
                    throw new \Exception("{$property} is read-only");
                }
                $this->$property = $arguments[0];
                return $this;
            }
        }
        throw new \Exception("{$property} method not implemented");
    }

    public function __get($name)
    {
        $function = 'get' . ucfirst($name);
        return $this->$function();
    }

    public function __set($name, $value)
    {
        $function = 'set' . ucfirst($name);
        return $this->$function($value);
    }
}
